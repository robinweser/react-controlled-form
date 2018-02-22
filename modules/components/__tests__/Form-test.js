import React from 'react'
import { createStore, combineReducers } from 'redux'

import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Form from '../Form'
import Field from '../Field'
import { formReducer } from '../../index'

describe('Rendering a Form component', () => {
  it('should initialize the form data', () => {
    const store = createStore(
      combineReducers({
        ...formReducer,
      })
    )

    const wrapper = mount(
      <Form
        formId="name"
        initialFields={{
          firstname: {
            value: 'John',
          },
          lastname: { value: 'Doe' },
        }}
        render={({ data }) => (
          <div>
            Hello {data.firstname.value} {data.lastname.value}
          </div>
        )}
      />,
      {
        context: {
          store,
        },
      }
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should initialize the form data form inner fields', () => {
    const store = createStore(
      combineReducers({
        ...formReducer,
      })
    )

    const wrapper = mount(
      <Form
        formId="name"
        render={({ data }) => (
          <div>
            Hello {(data.firstname && data.firstname.value) || ''}.
            <Field
              fieldId="firstname"
              initialData={{ value: 'John' }}
              render={({ value }) => <input value={value} />}
            />
          </div>
        )}
      />,
      {
        context: {
          store,
        },
      }
    )

    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
