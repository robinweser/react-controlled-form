/* @flow */
import React from 'react'
import { asSubmit } from 'react-controlled-form'

const Submit = ({ submitForm }: { submitForm: Function }) =>
  <button onClick={submitForm}>Submit</button>

export default asSubmit(Submit)
