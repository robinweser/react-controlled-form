# `withState([mapStateToProps])`

It's basically a simplified & scoped convenient wrapper for react-redux's `connect`.<br>
It behaves identical to [`withData`](withData.md), but provides form state rather than form data.

## Arguments
1. `mapStateToProps` (*Function?*): A function that maps the form state to the component props. It has the signature *(state, ownProps) => Object*. By default it passes the whole form data as the `data` prop. ownProps refers to the props passed to the enhanced component itself.

## Returns
(*Function*) HoC that is used to apply the state mapping

## Example
```javascript
import React from 'react'
import { withState } from 'react-controlled-form'

function Warning({ accepted_terms }) {
  if (accepted_terms) {
    return null
  }

  return (
    <div>
      "You must accept our terms of trade in order to proceed."
    </div>
  )
}

const mapStateToProps = ({ accepted_terms }) => ({
  accepted_terms
})

export default withData(mapStateToProps)(Warning)
```
