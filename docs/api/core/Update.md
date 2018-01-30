# Update

It is is used to render a component with the ability to update any field data or the state of the wrapped form.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- | 
| render | (*Function*) | | A render function that renders the component shape. <br>It's first parameter is an object containing the following properties. |

### Render Properties

| Property | Type | Description |
| --- | --- | --- | 
| updateField | (*Function*) | Updates a specific field's data.<br>Accepts a fieldId and an object with `isEnabled`, `isRequired`, `isTouched`, `isValid` and `value`. Each value is optional though. |
| updateState | (*Function*) | Updates the form-scoped state.<br>Takes an object of new state keys and merges those with the existing state. |
| formId | (*string*) | The formId passed to the wrapping [Form](Form.md) component. |
| isFormValid | (*boolean*) | Indicates whether the whole form is valid or not. |

## Example
```javascript
import { Update } from 'react-controlled-form'

const max = 99

<Update render={({ updateField }) => (
  <button onClick={() => updateField('count', { value: max }))}>
    Set to max.
  </button>
)} />
```
