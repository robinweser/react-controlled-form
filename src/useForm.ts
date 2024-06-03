import { useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react'
import { z, ZodObject, ZodError, ZodRawShape, ZodIssue, ZodEffects } from 'zod'

export type Field<T> = {
  value: T
  disabled: boolean
  touched: boolean
  valid: boolean
  errorMessage?: string
}

export type FieldProps = {
  name: string
  required: boolean
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
  formatErrorMessage: (error: ZodIssue, name: string) => string = defaultFormatErrorMessage
) {
  const [fields, setFields] = useState<FieldsMap>({})

  type Options<T> = {
    value?: T
    disabled?: boolean
    touched?: boolean
  }

  function useField<T = string>(
    name: keyof S,
    { value = '' as T, disabled = false, touched = false }: Options<T>
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

    function update(data: Partial<Field<T>>) {
      if (typeof data.value !== 'undefined') {
        ref.current = data.value

        const errorMessage = validate(data.value)

        setField((field: Field<T>) => ({
          ...field,
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

    const isValid = !field.errorMessage

    const inputProps = {
      value: field.value,
      disabled: field.disabled,
      // Only show validation error when is touched
      valid: !field.touched ? true : isValid,
      name,
      onChange,
      // onFocus,
      // onBlur,
    }

    const fieldProps: FieldProps = {
      // Only show errrorMessage and validation styles if the field is touched according to the config
      errorMessage: field.touched ? field.errorMessage : undefined,
      required: !isOptional,
      name: name as string,
    }

    return {
      ...field,
      name,
      update,
      reset,
      isValid,
      inputProps,
      fieldProps,
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
