# Submit

It is is used to render a component with the ability to submit the whole form.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- | 
| render | (*Function*) | | A render function that renders the component shape. <br>It's first parameter is an object containing the following properties. |

### Render Properties

| Property | Type | Description |
| --- | --- | --- | 
| submitForm | (*Function*) | Submits the wrapping form. |
| formId | (*string*) | The formId passed to the wrapping [Form](Form.md) component. |
| isFormValid | (*boolean*) | Indicates whether the whole form is valid or not. |

## Example
```javascript
import { Submit } from 'react-controlled-form'

<Submit render={({ submitForm }) => (
  <button type="submit" onClick={submitForm}>Submit</button>
)} />
```
