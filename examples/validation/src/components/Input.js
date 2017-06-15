/* @flow */
import React from 'react'
import { asField } from 'react-controlled-form'

type InputProps = {
  value: any,
  updateField: Function,
  validate?: Function,
  isValid: boolean,
  fieldId: string
}

const Input = ({
  updateField,
  value,
  isValid,
  fieldId,
  validate = () => true
}: InputProps) => {
  function onInput(e) {
    const newValue = e.target.value

    updateField({
      value: newValue,
      isValid: validate(newValue)
    })
  }

  return (
    <input
      value={value}
      onInput={onInput}
      placeholder={fieldId}
      style={{ backgroundColor: isValid ? 'inherit' : 'red' }}
    />
  )
}

export default asField(Input)
