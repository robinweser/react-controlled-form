# Changelog

## 1.0

#### 1.1.1
* `asField`'s second parameter `defaultField` now also accepts a function of props that returns the default field data as an object

#### 1.1.0

#### Form State
* added the `withState`-HOC to provide form state to components
* now passing `state` and `updateState` to both Form's `onChange` and `onSubmit`
* passing `state` and `updateState` to the `asField`-HOC

#### Improvements
* added the `ownProps` (second) parameter to `withData`- and `withState`-HOC
* added the `defaultData` (second) parameter to the `asField`-HOC
* passing `previousData` to Form's `onChange`
* Ability to disable auto-execution of `event.preventDefault` on submit

#### 1.0.0
Initial Release
