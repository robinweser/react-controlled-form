import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Form, mapDataToValues } from 'react-controlled-form'

import Submit from './components/Submit'
import Input from './components/Input'

import DataDisplay from './DataDisplay'
import store from './store'

function onSubmit({ data, resetForm }) {
  alert(JSON.stringify(mapDataToValues(data), null, 2))
  resetForm()
}

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Form formId="validation" onSubmit={onSubmit}>
        <div>
          <h1>Validation Example</h1>
          <br />
          <Input
            fieldId="name"
            validate={value => value.match(/^[a-zA-z]*$/) !== null}
          />
          <Input
            fieldId="age"
            validate={value => value.match(/^[0-9]*$/) !== null}
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
