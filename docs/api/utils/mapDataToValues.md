# `mapDataToValues(data)`

Reduces the whole data object to an object with just the data values.<br>
It is especially useful if you just want to send the form values to a backend.

## Arguments
1. `data` (*Object*): The data object which contains all the field data. It is passed to [Form](../core/Form.md)'s `onChange`, `onSubmit` and `validate` and is mapped to component props using [`withData`](../core/withData.md).

## Returns
(*Function*) An object with just the field values.

## Example
```javascript
import { mapDataToValues } from 'react-controlled-form'

// example data
const data = {
  firstname: {
    value: 'John',
    isRequired: false,
    isValid: true,
    isEnabled: true,
    isTouched: true
  },
  accepted_terms: {
    value: true,
    isRequired: true,
    isValid: true,
    isTouched: true
  }
}

const values = mapDataToValues(data)

values === {
  firstname: 'John',
  accepted_terms: true
}
```
