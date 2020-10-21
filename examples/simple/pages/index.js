import React, { useState } from 'react'

import { useField, useForm, useFormDebugger } from 'react-controlled-form'

const DataDisplay = ({ data }) => (
  <div>
    <h3>Form Data</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
)

function Input({ label, name, isValid, errorMessage, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label hmtlFor={name}>{label}</label>
      <input
        {...props}
        id={name}
        name={name}
        style={{ borderColor: isValid ? 'black' : 'red', borderStyle: 'solid' }}
      />
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  )
}

export default () => {
  const firstname = useField({
    name: 'firstname',
    showValidationOn: 'change',
    validation: {
      'Enter at least 2 characters.': value => value.length >= 2,
      // this is only for showcase reasons, not a valid name validation!
      'You can only use alphabetic characters.': /^[a-z]+$/gi,
    },
  })

  const lastname = useField({
    name: 'lastname',
    showValidationOn: 'blur',
    validation: {
      'Enter at least 2 characters.': value => value.length >= 2,
      // this is only for showcase reasons, not a valid name validation!
      'You can only use alphabetic characters.': /^[a-z]+$/gi,
    },
  })

  const age = useField({
    name: 'age',
    validation: {
      'You must be 18.': value => parseInt(value) >= 18,
    },
  })

  const { submit, reset } = useForm(firstname, lastname, age)
  const { fields } = useFormDebugger(firstname, lastname, age)

  return (
    <form
      onSubmit={e => {
        e.preventDefault()

        submit((isValid, data) => {
          if (isValid) {
            alert(JSON.stringify(data))
            reset()
          }
        })
      }}
      style={{ display: 'flex', flexDirection: 'column' }}>
      <Input label="First Name" {...firstname.props} />
      <Input label="Last Name" {...lastname.props} />
      <Input label="Age" {...age.props} />
      <input type="submit" value="Submit" />
      <DataDisplay data={fields} />
    </form>
  )
}
