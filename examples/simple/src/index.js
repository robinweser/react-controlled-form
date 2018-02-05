import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Form, Field, mapDataToValues } from 'react-controlled-form'

import store from './store'

const Input = ({ fieldId }) =>
  <Field
    fieldId={fieldId}
    render={({ value, updateField }) =>
      <input
        onChange={e => updateField({ value: e.target.value })}
        placeholder={fieldId}
        value={value}
      />}
  />

const DataDisplay = ({ data }) =>
  <div>
    <h3>Form Data</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>

ReactDOM.render(
  <Provider store={store}>
    <Form
      formId="simple"
      onChange={console.log}
      render={({ reset, data }) =>
        <form
          onSubmit={() => {
            alert(JSON.stringify(mapDataToValues(data), null, 2))
            reset()
          }}>
          <div>
            <h1>Simple Example</h1>
            <br />
            <Input fieldId="firstname" />
            <Input fieldId="lastname" />
            <button>Submit</button>
            <br />
            <DataDisplay data={data} />
          </div>
        </form>}
    />
  </Provider>,
  document.getElementById('root')
)
