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

function InputWithValidation({ value, isValid, updateField }) {
  function onChange(e) {
    const nextValue = e.target.value

    updateField({
      isValid: validate(nextValue),
      nextValue
    })
  }

  const warning = isValid ? null : (
    <span style={{ color: 'red' }}>Only real positive numbers are allowed.</span>
  )

  return (
    <div>
      <input 
        value={value} 
        onChange={onChange}
        style={{
          // simple way to indicate field validation
          color: isValid ? 'green' : 'red'
        }}
      />
      {warning}
    </div>
  )
}

// Usage
<Field fieldId='age' render={InputWithValidation} />
```

## Flexible Error Messages
For many use cases, the primitive implementation is just fine. Yet, sometimes we want more flexible advanced error message. For example, if we want to show a message that depends on the validation state of multiple form fields. Another example would be, to display the message somewhere else e.g. in a dedicated form validation overlayer.

#### Example
```javascript
import { Form } from 'react-controlled-form'

function Message ({ age, country }) {
  if (age.isValid) {
    return null
  }

  return (
    <span>You are not allowed to smoke under the age of 18 in {country.value}!</span>
  )
}

// Usage
<Form formId="age" render={({ data }) => {
  <form>
   ...
   <Message data={data} />
  </form>
}}>
```
