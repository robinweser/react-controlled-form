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

function mapFieldsToData(fields: Record<string, any>): Record<string, string> {
  const obj: Record<string, string> = {}
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
  }

  function useField<T = string>(
    name: keyof S,
    {
      value = '' as T,
      disabled = false,
      touched = false,
      showValidationOn,
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

    const errorMessage = validate(value)

    const initialField = {
      value,
      disabled,
      touched,
      valid: !errorMessage,
      errorMessage,
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

    // TODO: show validation on change option
    function onChange(e: ChangeEvent<HTMLInputElement>) {
      const newValue = e.target.value as T

      ref.current = newValue

      const errorMessage = validate(newValue)

      setField((field: Field<T>) => ({
        ...field,
        valid: !errorMessage,
        errorMessage,
        value: newValue,
      }))
    }

    const required = !isOptional
    // Only show validation error when is touched
    const valid = !field.touched ? true : !field.errorMessage
    // Only show errrorMessage and validation styles if the field is touched according to the config
    const message = field.touched ? field.errorMessage : undefined

    const labelProps = {
      id: labelId,
      htmlFor: id,
      'data-required': required,
    }

    const inputProps: Object = {
      value: field.value,
      disabled: field.disabled,
      'data-valid': valid,
      id,
      name,
      onChange,
      onFocus: () => update({ touched: false }),
      ...(showValidationOn === 'blur'
        ? { onBlur: update({ touched: false }) }
        : {}),
    }

    const props = {
      ...labelProps,
      ...inputProps,
      labelId,
      errorMessage: message,
      valid,
      required,
    }

    return {
      ...field,
      id,
      required,
      valid,
      name,
      update,
      reset,
      errorMessage: message,
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
