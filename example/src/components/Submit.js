/* @flow */
import React from 'react'
import { asSubmit } from 'react-controlled-form'

function Button({ isValid, submitForm }) {
  return <button onClick={submitForm} style={{
    opacity: isValid ? 1.0 : 0.5
  }} >Submit</button>
}

export default asSubmit(Button)
