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
    ).toEqual({
      foo: {
        data: {
          bar: {
            value: '',
            isEnabled: true,
            isTouched: false,
            isRequired: false,
            isValid: true,
          },
        },
        state: {},
      },
    })
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
    ).toEqual({
      foo: {
        data: {
          bar: {
            value: true,
            isEnabled: true,
            isTouched: false,
            isRequired: true,
            isValid: false,
          },
        },
        state: {},
      },
    })
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
    ).toEqual({
      foo: {
        data: {
          bar: {
            value: 'baz',
            isEnabled: false,
            isTouched: false,
            isRequired: true,
            isValid: false,
          },
        },
        state: {},
      },
    })
  })
})
