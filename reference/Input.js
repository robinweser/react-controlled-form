import React from 'react'
import { asField, validateWithRequired } from '../modules'

type InputProps = {
  value: any,
  isValid: boolean,
  isRequired: boolean,
  isEnabled: boolean,
  updateField: Function,
  validate?: Function,
  otherProps: any
}

const defaultValidate = () => true

const Input = ({
  value,
  isValid,
  isRequired,
  isEnabled,
  updateField,
  validate = defaultValidate,
  ...otherProps
}: InputProps) => {
  function onInput(e) {
    const newValue = e.target.value

    const isValid =
      validateWithRequired({ value: newValue, isRequired }) &&
      validate(newValue)

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

export default asField(Input, ({ defaultValue, required, disabled }) => ({
  value: defaultValue,
  isRequired: required,
  isEnabled: !disabled
}))
