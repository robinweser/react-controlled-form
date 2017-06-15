import React from 'react'
import { withData } from 'react-controlled-form'

const DataDisplay = ({ data, isFormValid }) =>
  <div>
    <h3>Form Data</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
    <br />
    Form isValid: {isFormValid.toString()}
  </div>

export default withData()(DataDisplay)
