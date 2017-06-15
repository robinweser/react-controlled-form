/* @flow */
import React from 'react'
import { asSubmit } from 'react-controlled-form'

type SubmitProps = {
  submitForm: Function,
  isFormValid: boolean
}

const Submit = ({ submitForm, isFormValid }: SubmitProps) =>
  <button onClick={submitForm} disabled={!isFormValid}>
    Submit
  </button>

export default asSubmit(Submit)
