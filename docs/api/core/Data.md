# Data

Is used to render a component based on form field data.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- | 
| render | (*Function*) | | A render function that renders the component shape. <br>It's first parameter is an object containing the following properties. |

### Render Properties

| Property | Type | Description |
| --- | --- | --- | 
| data | (*Object*) | An object containing the form field data by fieldId. |
| formId | (*string*) | The formId passed to the wrapping [Form](Form.md) component. |
| isFormValid | (*boolean*) | Indicates whether the whole form is valid or not. |

## Example
```javascript
import { Data } from 'react-controlled-form'

<Data render={({ data }) => (
  <span>You are {data.age.value} years old.</span>
)} />
```
