# State

Is used to render a component based on form state.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- | 
| render | (*Function*) | | A render function that renders the component shape. <br>It's first parameter is an object containing the following properties. |

### Render Properties

| Property | Type | Description |
| --- | --- | --- | 
| state | (*Object*) | An object containing the form state. |
| formId | (*string*) | The formId passed to the wrapping [Form](Form.md) component. |
| isFormValid | (*boolean*) | Indicates whether the whole form is valid or not. |

## Example
```javascript
import { State } from 'react-controlled-form'

<State render={({ state }) => (
  <span>{state.acceptedTerms ? 'All set!' : 'You must accept the terms of trade.'}.</span>
)} />
```
