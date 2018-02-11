# Handling Submit

Once our form has been filled out completely, we most likely want to perform some data processing as soon as it gets submitted. A common use case is to send the data to a backend which then e.g. creates an account from the provided user data.

## Example
```javascript
import { Form } from 'react-controlled-form'

function UserForm({ data }) {
  function onSubmit() {
    fetch('https://api.mybackend.com/user/', {
      body: JSON.stringify(data),
      method: 'POST'
    }).then(res => {
      // do something if the server responds positively
    }).catch(err => {
      // do something if sending data went wrong
    })
  }

  return (
    <form onSubmit={onSubmit}>
      ...
    </form>
  )
}

// Usage
<Form formId='user' render={UserForm} />
```
