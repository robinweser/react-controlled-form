# Handling Submit

Once our form has been filled out completely, we most likely want to perform some data processing as soon as it gets submitted. A common use case is to send the data to a backend which then e.g. creates an account from the provided user data.

We can do that within the [`onSubmit`](../api/Form.md#props)-callback passed to our wrapping [`<Form>`](../api/Form.md) component.

## Example
```javascript
import { Form } from 'react-controlled-form'

function onSubmit({ data }) {
  fetch('https://api.mybackend.com/user/', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(res => {
    // do something if the server responds positively
  }).catch(err => {
    // do something if sending data went wrong
  })
}

export default () => (
  <Form formId='user' onSubmit={onSubmit}>
   /* form fields */
  </Form>
)
```
