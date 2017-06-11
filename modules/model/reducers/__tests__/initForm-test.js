import initForm from '../initForm'

const payload = p => ({ payload: p })

describe('Initializing a form', () => {
  it('should add an empty object', () => {
    expect(initForm({}, payload({ formId: 'foo' }))).toEqual({ foo: {} })
  })

  it('should set an initial state', () => {
    expect(
      initForm(
        {},
        payload({
          formId: 'foo',
          initialFields: {
            bar: {
              value: true,
              isRequired: false
            },
            baz: {
              isEnabled: false
            }
          }
        })
      )
    ).toEqual({
      foo: {
        bar: {
          value: true,
          isRequired: false
        },
        baz: {
          isEnabled: false
        }
      }
    })
  })
})
