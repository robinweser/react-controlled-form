import createUseField from '../factories/createUseField'

function resolveProps({ field, update, validate, options }) {
  const {
    name,
    value,
    isLoading,
    isDisabled,
    isRequired,
    isTouched,
    errorMessage,
  } = field
  const { showValidationOn } = options

  function onChange(e) {
    const newValue = e.target.value
    const dirty = newValue !== value
    const errorMessage = validate(newValue)

    update((field) => ({
      ...field,
      value: newValue,
      errorMessage,
      isTouched: showValidationOn === 'change' ? dirty : field.isTouched,
      isValid: !errorMessage && !field.isLoading,
    }))
  }

  const props = {
    name,
    value,
    loading: isLoading,
    disabled: isDisabled,
    required: isRequired,
    // only show errrorMessage and validation styles if the field is touched according to the config
    errorMessage: isTouched ? errorMessage : undefined,
    isValid: isTouched ? !errorMessage : true,
    onChange,
  }

  // by default, we always hide validation errors once the field is focused again
  props.onFocus = () => update({ isTouched: false })
  if (showValidationOn === 'blur') {
    props.onBlur = () => update({ isTouched: true })
  }

  return props
}

export default createUseField(resolveProps)
