# Form Validation

Validation is an important part for most forms. There are two ways to perform validation.

## Global Validation
We are able to validate the whole form by passing a [`validate`](../api/Form.md#props) function to our wrapping [`<Form>`](../api/Form.md) component.<br>
This is primarily useful for special cross-validation cases where multiple field values are validated together.

#### Example
```javascript
import { Form } from 'react-controlled-form'

// e.g. if we do not ship to Berlin, Germany
function validate({ data }) {
  return data.country.value !== 'Germany' ||
    data.city.value !== 'Berlin'
}

export default () => (
  <Form formId="address" validate={validate}>
    /* form fields */
  </Form>
)
```

## Per-Field Validation
Although we are already able to validate the whole form, it is often much simpler and more intuitive to allocate validation with each field.<br>
The most common way is to validate on user input.

#### Example
```javascript
import { asField } from 'react-controlled-form'

// only allow real positive numbers
function validate(value) {
  return value.match(/^\d+$/) !== null && parseInt(value) > 0
}

const Age = ({ updateField, value, isValid }) => {
  function onInput(e) {
    const value = e.target.value

    updateField({
      isValid: validate(value),
      value
    })
  }

  return (
    <input
    value={value}
    onInput={onInput}
    style={{
      color: isValid ? 'green' : 'red'
    }} />
  )
}

export default asField(Age)
```
