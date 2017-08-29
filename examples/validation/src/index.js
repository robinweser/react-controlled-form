import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Form, mapDataToValues, validateWithRequired } from 'react-controlled-form'

import Submit from './components/Submit'
import Input from './components/Input'

import DataDisplay from './DataDisplay'
import store from './store'

function onSubmit({ data, resetForm }) {
  alert(JSON.stringify(mapDataToValues(data), null, 2))
  resetForm()
}

const initialFields = {
  name: {
    isTouched: true,
    isValid: true,
    value: "Prepopulated",
  },
  age: {
    isValid: false,
  }
};

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Form formId="validation" initialFields={initialFields} onSubmit={onSubmit}>
        <div>
          <h1>Validation Example</h1>
          <label>Name&#42;</label>
          <Input
            fieldId="name"
            isRequired
            placeholder="Prepopulated required field"
            validate={value => validateWithRequired(value, true) && value.match(/^[a-zA-z]*$/) !== null}
          />
          <label>Age&#42;</label>
          <Input
            fieldId="age"
            isRequired
            placeholder="Required field"
            validate={value => validateWithRequired(value, true) && value.match(/^[0-9]*$/) !== null}
          />
          <label>Description</label>
          <Input
            fieldId="description"
            placeholder="Optional field"
            validate={value => value.match(/^[a-zA-z]*$/) !== null}
          />
          <Submit />
          <br />
          <DataDisplay />
        </div>
      </Form>
    </Provider>,
    document.getElementById('root')
  )

render()
store.subscribe(render)
