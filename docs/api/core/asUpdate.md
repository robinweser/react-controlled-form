# `asUpdate(component)`

It is used to pass the form updater methods to any React component.
## Arguments
1. `component` (*ReactComponent*): A React component that gets enhanced.

#### Props
The `component` receives a set of props that are passed down by the HoC.
All props automatically update if a change is triggered for this field.

| Prop | Type | Description |
| --- | --- | --- |
| updateField | (*Function*) | Updates a specific form field data. It takes two parameters:<br>1. `fieldId`: The unique field id<br>2. `fieldData`: The new field data. |
| updateState | (*Function*)  | Updates the current form state. Takes an object with updated state keys. |

## Returns
(*ReactComponent*) Enhanced React component

## Example
```javascript
import React from 'react'
import { asUpdate } from 'react-controlled-form'

// will set the field 'name' to 'John'
function DemoUpdateButton({ updateField }) {
  const updateName = () => updateField('name', 'John')

  return <button onClick={updateName}>Update</button>
}

const DemoUpdate = asSubmit(DemoUpdateButton)

// usage
<DemoUpdate />
```
