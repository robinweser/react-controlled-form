# State

Within react-controlled-form, we sometimes talk about "form state". This is neither connected to the field data nor has it to do with React's component state.<br>
Actually, "form state" is a built-in part of every [Form](../api/Form.md) and can be used to set a certain state in special cases. It is pretty similar to React's component state or Redux state in general, but is shipped with special APIs to ensure it is encapsulated with every form instance.<br>

It can be especially useful when dealing with complex forms that have several different validation states.

#### Related
* [Using Form State](../guides/UsingFormState.md)
* [API Reference - `withState`](../api/withFormState.md)
