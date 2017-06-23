# `validateWithRequired(value, isRequired)`

A simple validation helper that checks if a `value` is valid according to its `isRequired` indicator.

If `isRequired=false` it will  always return `true`.<br>
If `isRequired=true` it will return `true` for truthy boolean, non-empty strings (ignoring whitespace), numbers, objects and arrays. Otherwise it will return `false`.

## Arguments
1. `value` (*any*): The field value which is validated
2. `isRequired` (*boolean*): The field required indicator.

## Returns
(*boolean*) Value validation indicator (isValid).

## Example
```javascript
import { validateWithRequired } from 'react-controlled-form'


validateWithRequired({
  value: '',
  isRequired: false
}) // => true

validateWithRequired({
  value: '',
  isRequired: true
}) // => false

validateWithRequired({
  value: 'foo',
  isRequired: true
}) // => true
```
