# Controlled Forms

react-controlled-form aims to **simplify form management** with React and Redux.<br>
It ships functional APIs to create your very own form fields and is built with **flexibility** and **customization** in mind.<br>

It allows you to **bring your own components**. You do not have to struggle with predefined input components ever again!

<img alt="TravisCI" src="https://travis-ci.org/rofrischmann/react-controlled-form.svg?branch=master"> <a href="https://codeclimate.com/github/rofrischmann/react-controlled-form/coverage"><img alt="Test Coverage" src="https://codeclimate.com/github/rofrischmann/react-controlled-form/badges/coverage.svg"></a> <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-controlled-form.svg"> <img alt="npm version" src="https://badge.fury.io/js/react-controlled-form.svg">

## Installation
> Controlled Forms requires `react-redux` to be installed in your project. Therefore, `react` and `redux` must also be installed.

```sh
yarn add react-controlled-form react react-redux redux
```

## Benefits
* simple API
* full flexibility
* custom form fields
* reactive forms


## The Gist
```javascript
import { Form, asField, asSubmit } from 'react-controlled-form'

const InputField = ({ value, updateField }) => (
  <input value={value} onInput={e => updateField({ value: e.target.value })} />
)

const SelectField = ({ value, options, updateField }) => (
  <select onChange={e => updateField({ value: e.target.value })}>
    {options.map(country => (
      <option key={country} selected={country === value}>{country}</option>
    ))}
  </select>
)

const Input = asField(InputField)
const Select = asField(SelectField)

const countries = [
  'Germany',
  'United States',
  'Australia',
  'India'
]

const initialFields = {
  lastname: { isRequired: true }
  country: { value: 'Germany' }
}

function onSubmit({ data }) {
  console.log("Submitted: ", data)
}

export default () => (
  <Form formId="contact" onSubmit={onSubmit} initialFields={initialFields}>
    <Input fieldId="firstname" />
    <Input fieldId="lastname" />
    <Select fieldId="country" options={counties} />
  </Form>
)
```

## Documentation

* [Introduction](https://react-controlled-form.js.org/docs/Introduction.html)
* [Guides](https://react-controlled-form.js.org/docs/Guides.html)
* [API Reference](https://react-controlled-form.js.org/docs/API.html)

## Examples



## License
react-controlled-form is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@rofrischmann](http://rofrischmann.de) and all the great contributors.
