import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Form, mapDataToValues } from 'react-controlled-form'

import Submit from './components/Submit'
import Select from './components/Select'

import DataDisplay from './DataDisplay'
import store from './store'

function onSubmit({ data, resetForm }) {
  alert(JSON.stringify(mapDataToValues(data), null, 2))
  resetForm()
}

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <Form formId="simple" onSubmit={onSubmit}>
        <div>
          <h1>Third-party Component Example: react-select</h1>
          <br />
          <div style={{ width: 300, paddingBottom: 10 }}>
            <Select fieldId="state" />
          </div>
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
