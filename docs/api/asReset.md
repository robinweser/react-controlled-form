# `asReset(component)`

It is used to enhance any React component with the ability to reset the wrapping form.

## Arguments
1. `component` (*ReactComponent*): A React component that gets enhanced.

## Returns
(*ReactComponent*) Enhanced React component

#### Props
| Prop | Type | Description |
| --- | --- | --- |
| resetForm | (*Function*) | Resets the wrapping form. |

## Example
```javascript
import React from 'react'
import { asReset } from 'react-controlled-form'

function Reset({ resetForm }) {
  return <button onClick={resetForm}>Reset</button>
}

export default asReset(Reset)
```
