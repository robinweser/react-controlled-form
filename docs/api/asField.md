# `asField(component, [defaultField])`

Probably the most common HoC. It is used to turn any ordinary React component into fully integrated form field that gets all required methods and data passed via props.

## Arguments
1. `component` (*ReactComponent*): A React component that gets enhanced.
3. `defaultField` (*Object?*): Default field data that applies to every `component`. The data will be overwritten by `initialFields` passed to the wrapping `<Form>` component.

#### Props
The `component` receives a set of props that are passed down by the HoC.
All props automatically update if a change is triggered for this field.

| Prop | Type | Description |
| --- | --- | --- |
| value | (*any*) | The controlled field value. |
| isEnabled | (*Boolean*) | Indicates if the field is enabled. |
| isRequired | (*Boolean*) | Indicates if the field is required. |
| isValid | (*Boolean*) | Indicates if the field is valid. |
| isTouched | (*Boolean*) | Indicates if the field is touched.<br>*(Returns true as soon as user input happens, but remains false for initialization)*. |
| state | (*Object*) | The form-scoped state |
| updateField | (*Function*) | Updates the field data. Takes an object with `isEnabled`, `isRequired`, `isTouched`, `isValid` and `value`. Each value is optional though. |
| updateState | (*Function*) | Updates the form-scoped state. Takes an object of new state keys and merges those with the existing state. |

## Returns
(*ReactComponent*) Enhanced React component

#### Props
In order to be used, the returned React component requires a single `fieldId` prop.

| Prop | Type | Description |
| --- | --- | --- |
| fieldId | (*string*) | A (unique) identifier used to store the field data in our Redux store |

## Example
```javascript
import React from 'react'
import { asField } from 'react-controlled-form'

function InputField({ value, updateField }) {
  return <input value={value} onInput={e => updateField({ value: e.target.value })}  />
}

// make every input auto-required
// and thus invalid by default
const defaultData = {
  isRequired: true,
  isValid: false
}
const Input = asField(InputField, defaultData)

// usage
<Input fieldId="firstname" />
<Input fieldId="lastname" />
```

## Tips & Tricks

* To provide maximum accessibility, it is recommended to utilize the default DOM attributes such as `disabled` and `required`. We may use ` isEnabled` and `isRequired` to set those attributes respectively.
* Using `onInput` instead of `onChange`, `onKeyPress` or `onKeyDown` ensures that the event has the most recent value.
* Field validation can easily be done within `onInput`. We can then set `isValid` within `updateField` to update the state. Altering the visual appearance depending on `isValid` helps to tell the user if the field is actually valid or not. Additional, we could show an error message if it's invalid.
