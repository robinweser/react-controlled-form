import React from 'react'
import { asField, validateWithRequired } from '../modules'

type InputProps = {
  value: any,
  state: Object,
  isValid: boolean,
  isRequired: boolean,
  isTouched: boolean,
  isEnabled: boolean,
  updateField: Function,
  updateState: Function,
  validate?: Function,
  otherProps: any
}

const defaultValidate = () => true

const Input = ({
  value,
  state,
  isValid,
  isRequired,
  isEnabled,
  isTouched,
  updateField,
  updateState,
  validate = defaultValidate,
  ...otherProps
}: InputProps) => {
  function onInput(e) {
    const newValue = e.target.value

    const isValid =
      validateWithRequired(newValue, isRequired) && validate(newValue)

    updateField({
      value: newValue,
      isValid
    })
  }

  return (
    <input
      {...otherProps}
      value={value}
      onInput={onInput}
      disabled={!isEnabled}
      required={!isRequired}
    />
  )
}

export default asField(
  Input,
  ({ defaultValue = '', required = false, disabled = false }) => ({
    value: defaultValue,
    isValid: validateWithRequired(defaultValue, required),
    isRequired: required,
    isEnabled: !disabled
  })
)
