import {
  useEffect,
  useRef,
  useState,
  FormEvent,
  ChangeEvent,
  useId,
} from 'react'
import { z, ZodObject, ZodError, ZodRawShape, ZodIssue } from 'zod'

export type Field<T> = {
  value: T
  disabled: boolean
  touched: boolean
  valid: boolean
  errorMessage?: string
}

type FieldReference = {
  ref: any
  update: (data: Partial<Field<any>>) => void
  reset: () => void
}

type FieldsMap = Record<string, FieldReference>

function mapFieldsToData(fields: Record<string, any>): Record<string, any> {
  const obj: Record<string, any> = {}
  for (const name in fields) {
    obj[name] = fields[name].ref.current
  }

  return obj
}

function defaultFormatErrorMessage(error: ZodIssue) {
  return error.message
}

// TODO: accept refined schemas, not possible due to https://github.com/colinhacks/zod/issues/2474
export default function useForm<S extends ZodRawShape>(
  schema: ZodObject<S>,
  formatErrorMessage: (
    error: ZodIssue,
    name: string
  ) => string = defaultFormatErrorMessage
) {
  const [fields, setFields] = useState<FieldsMap>({})

  type Options<T> = {
    value?: T
    disabled?: boolean
    touched?: boolean
    showValidationOn?: 'blur' | 'change'
    parseValue?: (e: any) => T
  }

  function useField<T = string>(
    name: keyof S,
    {
      value = '' as T,
      disabled = false,
      touched = false,
      showValidationOn,
      parseValue = (e: React.ChangeEvent<HTMLInputElement>) =>
        e.target.value as T,
    }: Options<T> = {}
  ) {
    const id = useId()
    const labelId = useId()

    const shape = schema.shape[name]
    const isOptional = shape.isOptional()

    function validate(value: T): undefined | string {
      const res = shape.safeParse(value)

      if (res.success) {
        return
      } else {
        return formatErrorMessage(res.error.errors[0], name as string)
      }
    }

    const message = validate(value)

    const initialField = {
      value,
      disabled,
      touched,
      valid: !message,
      errorMessage: message,
    }

    const ref = useRef<T>(value)
    const [field, setField] = useState<Field<T>>(initialField)

    function update(data: Partial<Field<T>>) {
      if (typeof data.value !== 'undefined') {
        ref.current = data.value

        const dirty = data.value !== initialField.value
        const errorMessage = validate(data.value)

        setField((field: Field<T>) => ({
          ...field,
          touched: showValidationOn === 'change' ? dirty : field.touched,
          ...data,
          errorMessage,
          valid: !errorMessage,
        }))
      } else {
        setField((field: Field<T>) => ({
          ...field,
          ...data,
        }))
      }
    }

    function reset() {
      ref.current = initialField.value

      setField(initialField)
    }

    useEffect(
      () =>
        setFields((fields: FieldsMap) => ({
          ...fields,
          [name]: {
            ref,
            update,
            reset,
          },
        })),
      []
    )

    function onChange(e: ChangeEvent<HTMLInputElement>) {
      update({ value: parseValue(e) })
    }

    const required = !isOptional
    // Only show validation error when is touched
    const valid = !field.touched ? true : !field.errorMessage
    // Only show errrorMessage and validation styles if the field is touched according to the config
    const errorMessage = field.touched ? field.errorMessage : undefined

    const touch = () => update({ touched: false })
    const untouch = () => update({ touched: false })

    function getListeners() {
      if (showValidationOn === 'blur') {
        return {
          onFocus: touch,
          onBlur: untouch,
        }
      }

      return {
        onFocus: touch,
      }
    }

    const labelProps = {
      id: labelId,
      htmlFor: id,
      'data-required': required,
    }

    const inputProps = {
      value: field.value,
      disabled: field.disabled,
      'data-valid': valid,
      id,
      name,
      onChange,
      ...getListeners(),
    }

    const props = {
      ...labelProps,
      ...inputProps,
      labelId,
      errorMessage,
    }

    return {
      ...field,
      required,
      valid,
      id,
      labelId,
      name,
      update,
      reset,
      errorMessage,
      inputProps,
      labelProps,
      props,
    }
  }

  function touchFields() {
    for (const name in fields) {
      fields[name].update({ touched: true })
    }
  }

  function reset() {
    for (const name in fields) {
      fields[name].reset()
    }
  }

  function handleSubmit(
    onSubmit: (data: z.infer<typeof schema>) => void,
    onError?: (error: ZodError) => void
  ) {
    return (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      touchFields()

      const data = mapFieldsToData(fields)
      const parsed = schema.safeParse(data)

      if (parsed.success) {
        onSubmit(parsed.data)
      } else {
        if (onError) {
          onError(parsed.error)
        }
      }
    }
  }

  const formProps = {
    noValidate: true,
  }

  return {
    useField,
    handleSubmit,
    formProps,
    reset,
  }
}
