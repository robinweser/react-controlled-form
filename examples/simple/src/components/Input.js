/* @flow */
import React from 'react'
import { asField } from 'react-controlled-form'

type InputProps = {
  value: any,
  updateField: Function,
  fieldId: string
}

const Input = ({ updateField, value, fieldId }: InputProps) => {
  function onInput(e) {
    updateField({
      value: e.target.value
    })
  }

  return <input value={value} onInput={onInput} placeholder={fieldId} />
}

export default asField(Input)
