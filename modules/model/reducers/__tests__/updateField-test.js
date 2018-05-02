import updateField from '../updateField'

const payload = p => ({ payload: p })
const initialFormState = {
  data: {
    bar: {
      isValid: true,
      isRequired: false,
      isEnabled: true,
      value: '',
      isTouched: false,
    },
  },
  state: {},
}

describe('Updating form fields', () => {
  it('should update values and set isTouched', () => {
    expect(
      updateField(
        { foo: initialFormState },
        payload({ formId: 'foo', fieldId: 'bar', value: 'test' })
      )
    ).toMatchSnapshot()
  })
})
