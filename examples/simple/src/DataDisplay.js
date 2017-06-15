import React from 'react'
import { withData } from 'react-controlled-form'

const DataDisplay = ({ data }) =>
  <div>
    <h3>Form Data</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>

export default withData()(DataDisplay)
