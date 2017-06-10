# `asSubmit(component)`

It is used to enhance any React component with the ability to submit the wrapping form.

## Arguments
1. `component` (*ReactComponent*): A React component that gets enhanced.

#### Props
The `component` receives a set of props that are passed down by the HoC.
All props automatically update if a change is triggered for this field.

| Prop | Type | Description |
| --- | --- | --- |
| submitForm | (*Function*) | Submits the wrapping form and triggers the onSubmit event. |
| isValid | (*Boolean*) | Indicates if the whole form is valid. |

## Returns
(*ReactComponent*) Enhanced React component

## Example
```javascript
import React from 'react'
import { asSubmit } from 'react-controlled-form'

function SubmitButton({ submitForm }) {
  return <button onClick={submitForm}>Submit</button>
}

const Submit = asSubmit(SubmitButton)

// usage
<Submit />
```

## Tips & Tricks

* You may use `isValid` to change the visual appearance of your submit button. This helps the user to better identify if the form can actually be submitted. For example, you may reduce the CSS `opacity` if it's invalid.
