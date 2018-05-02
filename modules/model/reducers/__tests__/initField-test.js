import initField from '../initField'

const payload = p => ({ payload: p })
const initialFormState = { data: {}, state: {} }

describe('Initializing a form field', () => {
  it('should use default values', () => {
    expect(
      initField(
        { foo: initialFormState },
        payload({ formId: 'foo', fieldId: 'bar' })
      )
    ).toMatchSnapshot()
  })

  it('should overwrite default values', () => {
    expect(
      initField(
        { foo: initialFormState },
        payload({
          formId: 'foo',
          fieldId: 'bar',
          isValid: false,
          isRequired: true,
          value: true,
        })
      )
    ).toMatchSnapshot()
  })

  it('should keep initial form field values', () => {
    expect(
      initField(
        {
          foo: {
            data: {
              bar: {
                value: 'baz',
                isValid: false,
                isEnabled: false,
              },
            },
            state: {},
          },
        },
        payload({
          formId: 'foo',
          fieldId: 'bar',
          isValid: false,
          isRequired: true,
          value: true,
        })
      )
    ).toMatchSnapshot()
  })
})
