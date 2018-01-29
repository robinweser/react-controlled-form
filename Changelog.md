# Changelog

## 2.0

### 2.0

#### 2.0.0
This new major release adds new Component APIs leveraging the render-props pattern.<br>
Check the documentation for more information.

## 1.0

### 1.2

### 1.2.5
* do not pass `initialState` to the underlaying `<form>`-element
	
#### 1.2.4
* pass the enhanced `onSubmit` rather than the pure `onSubmit` to the form

#### 1.2.3
* do not pass `initialFields` to the underlaying `<form>`-element

#### 1.2.0
##### API
* introducing `asUpdate` to inject `updateField` and `updateState` into any React component

-------

### 1.1

#### 1.1.7
* do not call `onChange` during form initialization

#### 1.1.6
* fixed a bug where `isTouched` was not updated correctly

#### 1.1.5
* added some simple helper

#### 1.1.4
* preserve initial data and state on `resetForm`

#### 1.1.3
* fixed `resetForm` actions in Form's onSubmit and `asReset`

#### 1.1.2
* fixed an resolving issue in Form
* improved action dispatcher

#### 1.1.1
* `asField`'s second parameter `defaultField` now also accepts a function of props that returns the default field data as an object

#### 1.1.0

##### Form State
* added the `withState`-HOC to provide form state to components
* now passing `state` and `updateState` to both Form's `onChange` and `onSubmit`
* passing `state` and `updateState` to the `asField`-HOC

##### Improvements
* added the `ownProps` (second) parameter to `withData`- and `withState`-HOC
* added the `defaultData` (second) parameter to the `asField`-HOC
* passing `previousData` to Form's `onChange`
* Ability to disable auto-execution of `event.preventDefault` on submit

-------

#### 1.0.0
Initial Release
