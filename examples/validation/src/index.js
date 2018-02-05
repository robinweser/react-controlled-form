import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  Form,
  Field,
  mapDataToValues,
  validateWithRequired,
} from 'react-controlled-form'

import store from './store'

const Input = ({ fieldId, placeholder, required, validate = () => true }) =>
  <Field
    fieldId={fieldId}
    initialData={{ isRequired: required }}
    render={({ updateField, value, isRequired, isTouched, isValid }) =>
      <input
        value={value}
        name={fieldId}
        placeholder={placeholder}
        required={isRequired}
        onChange={e => {
          const newValue = e.target.value

          updateField({
            value: newValue,
            isValid: validate(newValue),
          })
        }}
        style={{
          backgroundColor: isTouched && !isValid ? 'red' : 'inherit',
          display: 'block',
          marginBottom: '1em',
          marginTop: '0.5em',
        }}
      />}
  />

const initialFields = {
  name: {
    isTouched: true,
    isValid: true,
    value: 'Prepopulated',
  },
  age: {
    isValid: false,
  },
}

const DataDisplay = ({ data }) =>
  <div>
    <h3>Form Data</h3>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>

ReactDOM.render(
  <Provider store={store}>
    <Form
      initialFields={initialFields}
      formId="third-party"
      render={({ reset, data, validate }) =>
        <form
          onSubmit={() => {
            alert(JSON.stringify(mapDataToValues(data), null, 2))
            reset()
          }}>
          <div>
            <h1>Validation Example</h1>
            <label for="name">Name&#42;</label>
            <Input
              fieldId="name"
              required
              placeholder="Prepopulated required field"
              validate={value =>
                validateWithRequired(value, true) &&
                value.match(/^[a-zA-z]*$/) !== null}
            />
            <label for="age">Age&#42;</label>
            <Input
              fieldId="age"
              required
              placeholder="Required field"
              validate={value =>
                validateWithRequired(value, true) &&
                value.match(/^[0-9]*$/) !== null}
            />
            <label>Description</label>
            <Input
              fieldId="description"
              placeholder="Optional field"
              validate={value => value.match(/^[a-zA-z]*$/) !== null}
            />
            <button disabled={!validate()}>Submit</button>
            <br />
            <br />
            Form Valid: {validate().toString()}
            <br />
            <DataDisplay data={data} />
          </div>
        </form>}
    />
  </Provider>,
  document.getElementById('root')
)
