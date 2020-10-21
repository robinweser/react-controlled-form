import { useState } from 'react'
import { objectReduce } from 'fast-loops'

function validateField(validation, value) {
  return objectReduce(
    validation,
    (error, validate, message) => {
      // early return to skip the rest once the first validation failed
      if (error) {
        return error
      }

      if (validate instanceof RegExp) {
        if (value.match(validate) === null) {
          return message
        }
      } else if (!validate(value)) {
        return message
      }
    },

    undefined
  )
}

export default function createUseField(resolveProps) {
  return function useField({
    name,
    value = '',
    touched = false,
    disabled = false,
    required = false,
    loading = false,
    validation = {},
    ...options
  }) {
    function validate(value) {
      return validateField(validation, value)
    }

    const errorMessage = validate(value)
    const initial = {
      name,
      value,
      errorMessage,
      isLoading: loading,
      isDisabled: disabled,
      isTouched: touched,
      isRequired: required,
      isValid: !errorMessage && !loading,
    }

    const [field, setField] = useState(initial)
    const update = updater => {
      if (typeof updater === 'function') {
        setField(updater)
      } else {
        setField(field => ({ ...field, ...updater }))
      }
    }

    const props = resolveProps({
      field,
      update,
      validate,
      options,
    })

    return {
      // we expose those values for debugging reasons
      ...field,
      initial,
      name,
      props,
      update,
    }
  }
}
