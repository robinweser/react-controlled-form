# `asReset(component)`

It is used to enhance any React component with the ability to reset the wrapping form.

## Arguments
1. `component` (*ReactComponent*): A React component that gets enhanced.

#### Props
The `component` receives a set of props that are passed down by the HoC.

| Prop | Type | Description |
| --- | --- | --- |
| resetForm | (*Function*) | Resets the wrapping form. |

## Returns
(*ReactComponent*) Enhanced React component

## Example
```javascript
import React from 'react'
import { asReset } from 'react-controlled-form'

function ResetButton({ resetForm }) {
  return <button onClick={resetForm}>Reset</button>
}

const Reset = asReset(ResetButton)

// usage
<Reset />
```
