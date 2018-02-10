# Validation Errors

Now that we now, that we are able to validate both the whole form as well as each field independently, we surely want to display some helpful validation error messages as well.

## Primitive Input Error Messages
The most primitive way is to simply do that within the input component.<br>
Let's take the previous example and add a validation message.

#### Example
```javascript
import { Field } from 'react-controlled-form'

function validate(value) {
  return value.match(/^\d+$/) !== null && parseInt(value) > 0
}

// Usage
<Field fieldId='age' render={({ value, isValid, updateField }) => (
  <div>
    <input
      value={value}
      onChange={e => {
      const nextValue = e.target.value

      updateField({
        isValid: validate(nextValue),
        nextValue
      })}
      style={{
        // simple way to indicate field validation
        color: isValid ? 'green' : 'red'
      }}
    />
    {isValid ? null : (
      <span style={{ color: 'red' }}>Only real positive numbers are allowed.</span>
    )}
  </div>
)}>
```

## Flexible Error Messages
For many use cases, the primitive implementation is just fine. Yet, sometimes we want more flexible advanced error message. For example, if we want to show a message that depends on the validation state of multiple form fields. Another example would be, to display the message somewhere else e.g. in a dedicated form validation overlayer.

#### Example
```javascript
import { Form } from 'react-controlled-form'

const Message = ({ isValid, country }) => (
  if (isValid) {
    return null
  }

  return (
    <span>You are not allowed to smoke under the age of 18 in {country}!</span>
  )
)

const mapDataToProps = ({ age, country }) => ({
  isValid: age.value >= 18,
  country: country.value
})

// Usage
<Form formId="age" render={({ data }) => {
  <form>
   ...
   <Message data={data} />
  </form>
}}>
```
