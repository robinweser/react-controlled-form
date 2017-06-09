import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { Form } from 'react-controlled-form'
import Input from './components/Input'
import Submit from './components/Submit'

import store from './store'

const initialFields = {
  bar: {
    value: "test"
  },
  baz: {
    isEnabled: false
  }
}

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
  <div>    <Form formId="asd" initialFields={initialFields} onSubmit={() => console.log("SUBMITTED")}>
      <Input fieldId="bar" validate={(value) => value.match(/^[a-zA-Z]*$/) !== null} />
      <Input fieldId="baz" />
      <Submit />
    </Form></div>
    </Provider>,
    document.getElementById('root')
  )


window.store = store

store.subscribe(() => console.log(store.getState()))
render()
store.subscribe(render)
