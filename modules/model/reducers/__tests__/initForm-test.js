import initForm from '../initForm'

const payload = p => ({ payload: p })

describe('Initializing a form', () => {
  it('should add default data, state and isValid', () => {
    expect(initForm({}, payload({ formId: 'foo' }))).toEqual({
      foo: { data: {}, state: {} },
    })
  })

  it('should set initial data', () => {
    expect(
      initForm(
        {},
        payload({
          formId: 'foo',
          initialFields: {
            bar: {
              value: true,
              isRequired: false,
            },
            baz: {
              isEnabled: false,
            },
          },
        })
      )
    ).toEqual({
      foo: {
        data: {
          bar: {
            value: true,
            isRequired: false,
          },
          baz: {
            isEnabled: false,
          },
        },
        state: {},
      },
    })
  })

  it('should set an initial state', () => {
    expect(
      initForm(
        {},
        payload({
          formId: 'foo',
          initialState: {
            did_check: true,
          },
        })
      )
    ).toEqual({
      foo: {
        data: {},
        state: { did_check: true },
      },
    })
  })
})
