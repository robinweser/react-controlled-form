# Reset

It is is used to render a component with the ability to reset the whole form.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- | 
| render | (*Function*) | | A render function that renders the component shape. <br>It's first parameter is an object containing the following properties. |

### Render Properties

| Property | Type | Description |
| --- | --- | --- | 
| resetForm | (*Function*) | Resets the wrapping form. |
| formId | (*string*) | The formId passed to the wrapping [Form](Form.md) component. |
| isFormValid | (*boolean*) | Indicates whether the whole form is valid or not. |

## Example
```javascript
import { Reset } from 'react-controlled-form'

<Reset render={({ resetForm }) => (
  <button type="reset" onClick={resetForm}>Reset</button>
)} />
```
