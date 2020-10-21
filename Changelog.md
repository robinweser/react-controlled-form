# Changelog

## 4.0

Complete refactor in order to use React Hooks.

## 3.0

### 3.1

#### 3.1.3

- ability to actively not initialize value if initialData's value is set to `null`

#### 3.1.1

- removed `_initial` fields from all passed data and state props
- fixed a bug that rendered initial forms with empty data

#### 3.1.0

- refactored underlying structures in order to support re-initialisation and more stable form resets.
- fixed React setState errors.

### 3.0

#### 3.0.1

- Form's initial render is now skipped by default as it is not populated with data yet. It will automatically rerender once.

#### 3.0.0

This major release removes all old APIs (including HoCs) and reduces the whole API to just two simple components Field and Form.

Check the [Migration Guide](docs/introduction/Migration.md) for more information on how to migrate older versions.

## 2.0

### 2.0

#### 2.0.0

This new major release was an accidently released major version introducing the new render-props APIs. It did modify the existing Form component a bit, but was still backwards-compatible.<br>

## 1.0

### 1.2

### 1.2.5

- do not pass `initialState` to the underlaying `<form>`-element

#### 1.2.4

- pass the enhanced `onSubmit` rather than the pure `onSubmit` to the form

#### 1.2.3

- do not pass `initialFields` to the underlaying `<form>`-element

#### 1.2.0

##### API

- introducing `asUpdate` to inject `updateField` and `updateState` into any React component

---

### 1.1

#### 1.1.7

- do not call `onChange` during form initialization

#### 1.1.6

- fixed a bug where `isTouched` was not updated correctly

#### 1.1.5

- added some simple helper

#### 1.1.4

- preserve initial data and state on `resetForm`

#### 1.1.3

- fixed `resetForm` actions in Form's onSubmit and `asReset`

#### 1.1.2

- fixed an resolving issue in Form
- improved action dispatcher

#### 1.1.1

- `asField`'s second parameter `defaultField` now also accepts a function of props that returns the default field data as an object

#### 1.1.0

##### Form State

- added the `withState`-HOC to provide form state to components
- now passing `state` and `updateState` to both Form's `onChange` and `onSubmit`
- passing `state` and `updateState` to the `asField`-HOC

##### Improvements

- added the `ownProps` (second) parameter to `withData`- and `withState`-HOC
- added the `defaultData` (second) parameter to the `asField`-HOC
- passing `previousData` to Form's `onChange`
- Ability to disable auto-execution of `event.preventDefault` on submit

---

#### 1.0.0

Initial Release
