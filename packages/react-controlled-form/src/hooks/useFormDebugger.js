import { arrayReduce } from 'fast-loops'

// TODO: make this only available in development
// for now we're fine due to code splitting though
export default function useFormDebugger(...fields) {
  const isValid = arrayReduce(
    fields,
    (isValid, field) => isValid && field.isValid,
    true
  )

  const data = arrayReduce(
    fields,
    (data, { name, value }) => {
      data[name] = value
      return data
    },
    {}
  )

  const fieldData = arrayReduce(
    fields,
    (
      data,
      { name, value, isValid, isTouched, isDisabled, isLoading, errorMessage }
    ) => {
      data[name] = {
        value,
        isTouched,
        isValid,
        isDisabled,
        isLoading,
        errorMessage,
      }

      return data
    },
    {}
  )

  return {
    data,
    fields: fieldData,
    isValid,
  }
}
