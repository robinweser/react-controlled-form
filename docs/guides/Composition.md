# Composition

Sometimes, we want to use multiple HOCs together.<br>
Good news, it's pretty easy to do so. We can simply enhance a component with several HOCs in a row.<br>
Actually Redux ships a functional programming utility called [`compose`](http://redux.js.org/docs/api/compose.html) with is a perfect fit for this very use case.

For example, we want an input, that is able to submit the form if 'Enter' is pressed.

## Example
```javascript
import { asSubmit, asField } from 'react-controlled-form'
import { compose } from 'redux'

const Input = ({ value, updateField, submitForm }) => {
  function onKeyDown(e) {
      if (e.keyCode == 13) {
        submitForm()
      }
  }

  function onInput(e) {
    updateField({ value: e.target.value })
  }

  return (
    <input
      value={value}
      onInput={onInput}
      onKeyDown={onKeyDown}
    />
  )
}

export default compose(
  asField,
  asSubmit
)(Input)
```
