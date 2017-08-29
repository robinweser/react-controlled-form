/* @flow */
import React from 'react'
import { asField } from 'react-controlled-form'

type InputProps = {
  value: any,
  updateField: Function,
  validate?: Function,
  isRequired: boolean,
  isTouched: boolean,
  isValid: boolean,
  placeholder: string,
}

const Input = ({
  updateField,
  value,
  isRequired,
  isTouched,
  isValid,
  placeholder,
  validate = () => true
}: InputProps) => {
  function onChange(e) {
    const newValue = e.target.value;

    updateField({
      value: newValue,
      isValid: validate(newValue)
    });
  }

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={isRequired}
      style={{
        backgroundColor: isTouched && !isValid ? 'red' : 'inherit',
        display: 'block',
        marginBottom: '1em',
        marginTop: '0.5em',
      }}
    />
  )
}

export default asField(Input)
