import { useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react'
import { z, ZodObject, ZodError, ZodRawShape, ZodIssue } from 'zod'

export type Field<T> = {
  value: T
  disabled: boolean
  touched: boolean
  dirty: boolean
  valid: boolean
  errorMessage?: string
}

type FieldReference = {
  ref: {
    current: {
      value: any
      dirty: boolean
    }
  }
  update: (data: Partial<Field<any>>) => void
  reset: () => void
}

type FieldsMap = Record<string, FieldReference>

function mapFieldsToData(fields: Record<string, any>): Record<string, any> {
  const obj: Record<string, any> = {}
  for (const name in fields) {
    obj[name] = fields[name].ref.current.value
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
    showValidationOn?: 'submit' | 'blur' | 'change'
    parseValue?: (e: any) => T
  }

  function useField<T = string, C = ChangeEvent<HTMLInputElement>>(
    name: keyof S,
    {
      value = '' as T,
      disabled = false,
      touched = false,
      showValidationOn = 'submit',
      parseValue = (e: ChangeEvent<HTMLInputElement>) => e.target.value as T,
    }: Options<T> = {}
  ) {
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
      dirty: false,
      valid: !message,
      errorMessage: message,
    }

    const ref = useRef<{
      value: T
      dirty: boolean
    }>({
      value,
      dirty: false,
    })
    const [field, setField] = useState<Field<T>>(initialField)

    function update(data: Partial<Field<T>>) {
      if (typeof data.value !== 'undefined') {
        const dirty = data.value !== initialField.value
        const errorMessage = validate(data.value)

        ref.current = {
          value: data.value,
          dirty,
        }

        setField((field: Field<T>) => ({
          ...field,
          touched: showValidationOn === 'change' ? dirty : field.touched,
          dirty,
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
      ref.current = {
        value: initialField.value,
        dirty: false,
      }

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

    function onChange(e: C) {
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

    const inputProps = {
      value: field.value,
      disabled: field.disabled,
      required,
      name,
      'data-valid': valid,
      onChange,
      ...getListeners(),
    }

    const props = {
      name,
      value: field.value,
      disabled: field.disabled,
      valid,
      required,
      errorMessage,
      onChange,
      ...getListeners(),
    }

    return {
      ...field,
      required,
      valid,
      name,
      update,
      reset,
      errorMessage,
      inputProps,
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

  function isDirty() {
    for (const name in fields) {
      if (fields[name].ref.current.dirty) {
        return true
      }
    }

    return false
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
    isDirty,
    reset,
  }
}
