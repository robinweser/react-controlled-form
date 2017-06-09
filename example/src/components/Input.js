/* @flow */
import React from 'react'
import { asField } from 'react-controlled-form'

function Input({ value, validate = () => true, updateField, isValid, isEnabled, initField }) {
  function onInput(e) {
    const value = e.target.value

    const valid = validate(value)

    updateField({
      value,
      isValid: valid
    })
  }

  return <input value={value} disabled={!isEnabled} placeholder="test" onInput={onInput} style={{
    color: isValid ? 'green' : 'red'
  }} />
}

export default asField(Input)
