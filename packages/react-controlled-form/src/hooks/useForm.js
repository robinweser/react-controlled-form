import { arrayReduce } from 'fast-loops'

export default function useForm(...fields) {
  function touchFields() {
    fields.forEach(field => field.update({ isTouched: true }))
  }

  function reset() {
    fields.forEach(field => field.update(field.initial))
  }

  function submit(onSubmit) {
    const isValid = arrayReduce(
      fields,
      (isValid, field) => isValid && field.isValid,
      true
    )

    const data = arrayReduce(
      fields,
      (data, { value, name }) => {
        data[name] = value
        return data
      },
      {}
    )

    // if the form is invalid, we touch all fields to reveal the error messages
    if (!isValid) {
      touchFields()
    }

    onSubmit(isValid, data)
  }

  return {
    touchFields,
    submit,
    reset,
  }
}
