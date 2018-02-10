# Using Form State

As explained before, [form state](../basics/State.md) can be used to set a global state for each form instance.
This comes in very handy for complex forms with several different validation states and proper displaying logic. In general, you might try to avoid form state until it becomes indispensable. This most often happens as soon as you have cross-field dependencies.

For example, we might want to validate multiple fields at a time and set different keys for each validation case.

### Example
```javascript
import { Form } from 'react-controlled-form'

function onChange({ updateState, state, data }) {
  if (data.phone.value.substr(0, 3) === '+33') {
    updateState({
      phoneCountry: 'France'
    })
  }

  if (data.country.value !== state.phoneType) {
    updateState({
      invalidPhoneCountryCombination: true
    })
  }
}

// Usage
<Form formId="complex" onChange={onChange} render={...} />
```

We can then use this information e.g. to display customized and dynamic warning messages.

```javascript
function Warning({ invalidPhoneCountryCombination }) {
  if (!invalidPhoneCountryCombination) {
    return null
  }

  return (
    <span>Your phone number country code must match the selected country.</span>
  )
}

// Usage
<Form formId="complex" onChange={onChange} render={({ state }) => {
  <form>
    ...
    <Warning state={state} />
  </form>
}} />
```
