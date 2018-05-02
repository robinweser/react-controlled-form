import updateState from '../updateState'

const payload = p => ({ payload: p })
const initialFormState = {
  data: {},
  state: { is_checked: false, another_valid: true },
}

describe('Updating form state', () => {
  it('should merge the state', () => {
    expect(
      updateState(
        { foo: initialFormState },
        payload({
          formId: 'foo',
          newState: { is_checked: true, something_valid: false },
        })
      )
    ).toMatchSnapshot()
  })
})
