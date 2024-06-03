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
      <Field label="Full Name" {...name.fieldProps}>
        <TextInput {...name.inputProps} />
      </Field>
      <Field label="E-Mail" {...email.fieldProps}>
        <TextInput type="email" {...email.inputProps} />
      </Field>
      <Field label="Password" {...password.fieldProps}>
        <TextInput type="password" {...password.inputProps} />
      </Field>
      <button type="submit">Login</button>
    </form>
  )
}
```

In order for it to reflect UX bad practices, we need to build some lightweight wrappers around our actual input components.<br />
Here's a very simple example of how this could look like:

```tsx
// field.fieldProps includes the errorMessage as well as the name reference for the input
function Field({
  children,
  label,
  name,
  errorMessage,
  required,
}: PropsWithChildren<FieldProps & { label: string }>) {
  return (
    <div style={{ gap: 4 }}>
      <label htmlFor={name}>
        {label}
        {required ? '' : ' (optional)'}
      </label>
      {children}
      <p style={{ color: 'red' }}>{errorMessage}</p>
    </div>
  )
}

// field.inputProps returns a valid boolean next to default input props
// we can use it to highlight a validation error
function TextInput({
  valid,
  ...props
}: React.JSX.IntrinsicElements['input'] & { valid: boolean }) {
  return <input {...props} style={{ borderColor: valid ? 'black' : 'red' }} />
}
```

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
      return `This field requires at least ${error.minimum} characters.`
    default:
      return error.message
  }
}
```

### useField

A hook that manages the field state and returns the relevant HTML attributes to render our inputs.<br />
Also returns a set of helpers to manually update and reset the field.

| Parameter    |  Type                                                 | Default                                          |  Description                                                |
| ------------ | ----------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------- |
| name         | `keyof z.infer<typeof schema>`                        |                                                  | The name of the schema property that this field connects to |
| initialField | `{ value: any, disabled: boolean, touched: boolean }` | `{ value: "", disabled: false, touched: false }` | Initial field data                                          |

```ts
const { inputProps, fieldProps, update, reset } = useField('email')
```

#### inputProps

```ts
type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLElement>) => void
  value: any
  disabled: boolean
  valid: boolean
  name: string
}
```

#### fieldProps

```ts
type FieldProps = {
  name: string
  required: boolean
  errorMessage?: string
}
```

#### update

Programmatically change the data of a field. Useful e.g. when receiving data from an API.

> **Note**: If you know the data upfront, prefer to pass it to the `useField` hook directly though.

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

### formProps

An object that contains props that are passed to the native `<form>` element.
Currently only consists of a single prop:

```ts
const formProps = {
  noValidate: true,
}
```

## License

react-controlled-form is licensed under the [MIT License](http://opensource.org/licenses/MIT).<br>
Documentation is licensed under [Creative Common License](http://creativecommons.org/licenses/by/4.0/).<br>
Created with ♥ by [@robinweser](http://weser.io) and all the great contributors.
