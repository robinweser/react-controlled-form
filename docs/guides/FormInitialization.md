# Form Initialization

Sometimes, we want to initialize some form fields with default values or initial state. This can be especially helpful if we want to create persistent forms or auto-fill them with data received from a backend.

To achieve that, we can pass an [`initialFields`](../api/Form.md#props) object to our wrapping [`<Form>`](../api/Form.md) component.<br>
The keys should match the `fieldId`s we pass to the field components inside the form while the value **must** be an object with field data values. We only have to provide the data we actually want to set initially, thus every data value is optional.

There are 5 different properties which we are able to set. Check out [Fields.md](../basics/Fields.md) to learn what they're used for. If not set, they will be automatically set to their default value.

| Property | Default |
| --- | --- |
| value | `''` |
| isEnabled | true |
| isRequired | false |
| isTouched | false |
| isValid | true |

## Example
```javascript
import { Form } from 'react-controlled-form'

const initialFields = {
  firstname: {
    isRequired: true
  },
  accepted_terms: {
    value: false,
    isValid: false,
    isRequired: true
  }
}

export default () => (
  <Form formId="user" initialFields={initialFields}>
    /* form fields */
  </Form>
)
```
