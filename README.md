# Controlled Forms

react-controlled-form aims to **simplify form management** in React.<br>
It ships functional APIs to create your very own form fields and is built with **flexibility** and **customization** in mind.<br>

It allows you to **bring your own components**.<br>
You do not have to struggle with predefined input components ever again!<br>
It only uses React Hooks under-the-hood and is thus super fast.

<img alt="npm downloads" src="https://img.shields.io/npm/dm/react-controlled-form.svg"> <img alt="npm version" src="https://badge.fury.io/js/react-controlled-form.svg">

## Installation

```sh
yarn add react-controlled-form
```

> Controlled Forms requires `react>=16.3.0` to be installed in your project.

## Benefits

- simple functional API
- Controlled state using `useState`
- full flexibility
- custom form fields
- reactive forms

## The Gist

```jsx
import { useField, useForm } from 'react-controlled-form'

function Input({ isValid, errorMessage, ...props }) {
  return (
    <div>
      <input style={{ borderColor: isValid ? 'black' : 'red' }} {...props} />
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  )
}

const nameValidation = {
  'Please enter at least 2 characters.': (value) => value.length >= 2,
  'Only use alphabetic letters.': /^[a-z]*$/gi,
}

function Form() {
  const firstname = useField({
    name: 'firstname',
    validation: nameValidation,
  })

  const lastname = useField({
    name: 'firstname',
    validation: nameValidation,
  })

  const { submit, reset } = useForm(firstname, lastname)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()

        submit((isValid, data) => {
          if (isValid) {
            console.log('Submitted: ', data)
            reset()
          }
        })
      }}>
      <Input {...firstname.props} />
      <Input {...lastname.props} />
      <input type="submit" />
    </form>
  )
}
```

## API

### useField(options)

This hook uses `React.useState` under-the-hood and controls the state changes and validation for each field.
The internal representation of a field contains the following properties:

- value
- isValid
- isTouched
- isDisabled
- isRequired
- isLoading
- errorMessage

#### Options

| Option           |  Description                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| value            | The initial `value`.                                                                                           |
| touched          |  The initial `isTouched` value.                                                                                |
| loading          |  The initial `isLoading` value.                                                                                |
| disabled         |  The initial `isDisabled` value.                                                                               |
| required         |  The initial `isRequired` value.                                                                               |
| validation       |  An map of errorMessage-validator where validator can either be a function of value or a RegExp.               |
| showValidationOn |  When the field is "touched" and isValid / errorMessage are passed to the props.<br>Can be `change` or `blur`. |

#### Returns

`(Object)` An object containing the following properties:

```js
const shape = {
  // Those can be passed to your custom input implementation
  props,
  // A function used to update manually the field (use with caution)
  // It either takes properties from the internal field listed above
  // or a function of the current field that returns the new field
  update,
  initial,
  name,
  value,
  isValid,
  isTouched,
  isDisabled,
  isRequired,
  errorMessage,
}
```

### useForm(...fields)

This hook takes a list of fields, where a field is the output of the useField hook.

#### Returns

`(Object)` An object containing the following properties:

```js
const shape = {
  // Takes a function of (isValid, data) where isValid is the global validation state and data is a map of name-value
  // Calling submit will automatically touch all fields to reveal the error messages (if not already shown)
  submit,
  // Resets the form to its initial state
  reset,
  // Touches each field to reveal their validation state & error messages
  touchFields,
}
```

### useFormDebugger(...fields)

This hook is only meant for debugging reasons.
It takes the same fields as `useForm`, but returns all the field data on every render.

#### Returns

(Object) An object containing the following properties:

```js
const shape = {
  // A map of name-value pairs
  data,
  // A map of name-field pairs, where field represents the full internal representation of each field
  fields,
  // The global validation state which is accumulated by checking each field's isValid
  isValid,
}
```

---

### createUseField(resolveProps)

This factory function can be used to create your very own version of `useField` which can be useful if you want to implement different behaviour or return different props.

It takes a function that receives an object with the following shape:

```js
const params = {
  // All values from the internal field representation
  field,
  // A function used to validate the value according to the passed validation object
  validate,
  // The update function which is also returned by useField and described above
  update,
  // Any additionally passed options that are not directly part of the field representation e.g. showValidationOn
  options,
}
```

#### Usage

```js
import { createUseField } from 'react-controlled-form'

function resolveProps({ field, update, validate, options }) {
  const { name, value, isValid, isDisabled, isRequired } = field

  return {
    value,
    name,
    required: isRequired,
    disabled: isDisabled,
    onChange: (e) =>
      update({
        value: e.target.value,
        isValid: validate(e.target.value),
      }),
    style: {
      borderColor: isValid ? 'black' : options.validationColor,
    },
  }
}

const useField = createUseField(resolveProps)

// Usage
const firstname = useField({
  name: 'firstname',
  validationColor: 'pink',
  validation: {
    'Enter at least 2 characters.': (value) => value.length >= 2,
  },
})

// this will render an input with pink borders for invalid values
const Firstname = () => <input {...firstname.props} />
```

## Examples

- [Simple Example](examples/simple)

## License

react-controlled-form is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
