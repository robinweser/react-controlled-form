import initForm from '../initForm'

const payload = p => ({ payload: p })

describe('Initializing a form', () => {
  it('should add default data, state and isValid', () => {
    expect(initForm({}, payload({ formId: 'foo' }))).toMatchSnapshot()
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
    ).toMatchSnapshot()
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
    ).toMatchSnapshot()
  })
})
