# `withData(mapDataToProps)`
It's basically a simplified & scoped convenient wrapper for react-redux's `connect`.<br>
It helps to provide form data to any React component.

## Arguments
1. `mapDataToProps` (*Function?*): A function that maps the form data to the component props. It has the signature *data => Object*. By default it passes the whole form data as the `data` prop.

## Returns
(*Function*) HoC that is used to apply the data mapping

## Example
```javascript
import React from 'react'
import { withData } from 'react-controlled-form'

function User({ firstname, lastname, email }) {
  return (
    <div>
      <span>Name: {firstname} {lastname}</span>
      <span>Mail: {email}</span>
    </div>
  )
}

const mapDataToProps = ({ firstname, lastname, email }) => ({
  firstname: firstname.value,
  lastname: lastname.value,
  email: email.value
})

export default withData(mapDataToProps)(User)
```
