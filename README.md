# react-controlled-form

A package for creating controlled forms in React with baked in [zod](https://zod.dev) validation.<br />
You own and control the rendered markup and the hook takes care of the state and validation.

<img alt="npm version" src="https://badge.fury.io/js/react-controlled-form.svg"> <img alt="npm downloads" src="https://img.shields.io/npm/dm/react-controlled-form.svg"> <a href="https://bundlephobia.com/result?p=react-controlled-form@latest"><img alt="Bundlephobia" src="https://img.shields.io/bundlephobia/minzip/react-controlled-form.svg"></a>

## Installation

```sh
# npm
npm i --save react-controlled-form
# yarn
yarn add react-controlled-form
# pnpm
pnpm add react-controlled-form
```

## The Gist

```tsx
import * as React from 'react'
import { useForm, FieldProps } from 'react-controlled-form'
import { z, ZodError } from 'zod'

// create our schema with validation included
const Z_RegisterInput = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  // we can also pass custom messages as a second parameter
  password: z
    .string()
    .min(8, { message: 'Your password next to have at least 8 characters.' }),
})

type T_RegisterInput = z.infer<typeof Z_RegisterInput>

function Form() {
  // we create a form by passing the schema
  const { useField, handleSubmit, formProps, reset } = useForm(Z_RegisterInput)

  // now we can create our fields for each property
  // the field controls the state and validation per property
  const name = useField('name')
  const email = useField('email')
  const password = useField('password')

  function onSuccess(data: T_RegisterInput) {
    // do something with the safely parsed data
    console.log(data)
    // reset the form to its initial state
    reset()
  }

  function onFailure(error: ZodError) {
    console.error(error)
  }

  return (
    <form {...formProps} onSubmit={handleSubmit(onSuccess, onFailure)}>
      <label htmlFor="name">Full Name</label>
      <input id="name" {...name.inputProps} />

      <label htmlFor="email">E-Mail</label>
      <input id="email" type="email" {...email.inputProps} />
      <p style={{ color: 'red' }}>{email.errorMessage}</p>

      <label htmlFor="password">Password</label>
      <input id="password" type="password" {...password.inputProps} />
      <p style={{ color: 'red' }}>{password.errorMessage}</p>

      <button type="submit">Login</button>
    </form>
  )
}
```

> **Note**: This is, of course, a simplified version and you most likely render custom components to handle labelling, error messages and validation styling.<br />For such cases, each field also exposes a `props` property that extends the `inputProps` with non-standard HTML attributes.

## API Reference

### useForm

The core API that connects the form with a zod schema and returns a set of helpers to manage the state and render the actual markup.

| Parameter          |  Type                                        | Default                    |  Description                                       |
| ------------------ | -------------------------------------------- | -------------------------- | -------------------------------------------------- |
| schema             | ZodObject                                    |                            | A valid zod object schema                          |
| formatErrorMessage |  `(error: ZodIssue, name: string) => string` | `(error) => error.message` | A custom formatter that receives the raw zod issue |

```ts
import { z } from 'zod'

const Z_Input = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  // we can also pass custom messages as a second parameter
  password: z
    .string()
    .min(8, { message: 'Your password next to have at least 8 characters.' }),
})

type T_Input = z.infer<typeof Z_Input>

// usage inside react components
const { useField, handleSubmit, reset, formProps } = useForm(Z_Input)
```

#### formatErrorMessage

The preferred way to handle custom error messages would be to add them to the schema directly.<br />
In some cases e.g. when receiving the schema from an API or when having to localise the error, we can leverage this helper.

```ts
import { ZodIssue } from 'zod'

// Note: the type is ZodIssue and not ZodError since we always only show the first error
function formatErrorMessage(error: ZodIssue, name: string) {
  switch (error.code) {
    case 'too_small':
      return `This field ${name} requires at least ${error.minimum} characters.`
    default:
      return error.message
  }
}
```

### useField

A hook that manages the field state and returns the relevant HTML attributes to render our inputs.<br />
Also returns a set of helpers to manually update and reset the field.

| Parameter |  Type                          | Default               |  Description                                                |
| --------- | ------------------------------ | --------------------- | ----------------------------------------------------------- |
| name      | `keyof z.infer<typeof schema>` |                       | The name of the schema property that this field connects to |
| config    | [Config](#config)              | See [Config](#config) | Initial field data and additional config options            |

#### Config

| Property         | Type                                 | Default                 |  Description                                                                                                                |
| ---------------- | ------------------------------------ | ----------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| value            | `any`                                | `''`                    | Initial value                                                                                                               |
| disabled         | `boolean`                            | `false`                 | Initial disabled state                                                                                                      |
| touched          | `boolean`                            | `false`                 | Initial touched state that indicates whether validation errors are shown or not                                             |
| showValidationOn | `"change"` \| `"blur"` \| `"submit"` | `"submit"`              | Which event is used to trigger the touched state                                                                            |
| parseValue       | `(Event) => any`                     | `(e) => e.target.value` | How the value is received from the input element.<br />Use `e.target.checked` when working with `<input type="checkbox" />` |

```ts
const { inputProps, props, errorMessage, update, reset } = useField('email')
```

#### inputProps

Pass these to native HTML `input`, `select` and `textarea` elements.<br />
Use `data-valid` to style the element based on the validation state.

```ts
type InputProps = {
  name: string
  value: any
  disabled: boolean
  'data-valid': boolean
  onChange: React.ChangeEventHandler<HTMLElement>
  onBlur?: React.KeyboardEventHandler<HTMLElement>
}
```

#### props

Pass these to custom components that render label and input elements.<br />
Also includes information such as `errorMessage` or `valid` that's non standard HTML attributes and thus can't be passed to native HTML `input` elements directly.

```ts
type Props = {
  value: any
  name: string
  valid: boolean
  required: boolean
  disabled: boolean
  errorMessage?: string
  onChange: React.ChangeEventHandler<HTMLElement>
  onBlur?: React.KeyboardEventHandler<HTMLElement>
}
```

#### errorMessage

> **Note**: If you're using [`props`](#props), you already get the errorMessage!

A string containing the validation message. Only returned if the field is invalid **and** touched.

#### update

Programmatically change the data of a field. Useful e.g. when receiving data from an API.<br />
If value is changed, it will automatically trigger re-validation.

> **Note**: If you know the initial data upfront, prefer to pass it to the `useField` hook directly though.

```ts
update({
  value: 'Foo',
  touched: true,
})
```

#### reset

Resets the field back to its initial field data.

```ts
reset()
```

### handleSubmit

Helper that wraps the native `onSubmit` event on `<form>` elements.<br />
It prevents default action execution and parses the form data using the zod schema.

| Parameter |  Type                            |  Description                                       |
| --------- | -------------------------------- | -------------------------------------------------- |
| onSuccess | `(data: z.infer<typeof schema>)` | Callback on successful safe parse of the form data |
| onFailure | `(error: ZodError)`              | Callback on failed safe parse                      |

```ts
import { ZodError } from 'zod'

function onSuccess(data: T_Input) {
  console.log(data)
}

function onFailure(error: ZodError) {
  console.error(error)
}

// <form> onSubmit handler
const onSubmit = handleSubmit(onSuccess, onFailure)
```

### reset

Resets the form fields back to their initial field data. Helpful when trying to clear a form after a successful submit.

> **Note**: This API is similar to the `reset` helper that the `useField` hook returns. The only difference is that it resets all fields.

```
reset()
```

### isDirty

Returns whether the form is dirty, meaning that any of the fields was altered compared to their initial state.<br />
Useful e.g. when conditionally showing a save button or when you want to inform a user that he's closing a modal with unsafed changes.

```ts
isDirty()
```

### formProps

An object that contains props that are passed to the native `<form>` element.
Currently only consists of a single prop:

```ts
const formProps = {
  noValidate: true,
}
```

## Recipes

### Non-String Values

By default, [useField](#usefield) expects string values and defaults to an empty string if no initial value is provided.<br />
In order to also support e.g. `boolean` values or arrays, we can customise the types and pass new values.

```tsx
import { ChangeEvent } from 'react'

const acceptsTerms = useField<boolean, ChangeEvent<HTMLInputElement>>('terms', {
  // alter how the value is obtained if neccessary
  // e.g. for checkboxes or custom inputs
  parseValue: (e) => e.target.checked,
  // set an initial value overwritting the default empty string
  value: false,
})

// custom multi-select input that returns an array of values on change
type Tags = Array<string>
type TagsChangeEvent = (value: Tags) => void

const tags = useField<Tags, TagsChangeEvent>('tags', {
  parseValue: (value) => value,
  value: [],
})
```

Passing a custom value type and change event will also change the type of `field.value` and the expected input for [update](#update).

## License

react-controlled-form is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
