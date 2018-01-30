# State

Within react-controlled-form, we sometimes talk about *form state*. This is neither connected to the field data nor has it to do with React's component state.<br>
Actually, *form state* is a built-in part of every [Form](../api/core/Form.md) and should only be used to store additional information. It exists to separate pure form data from semantic information.<br>
It acts pretty similar to React's component state or Redux state in general, but is shipped with special APIs to ensure it is encapsulated with every form instance.<br>

It can be especially useful when dealing with complex forms that have several different validation states that yield different validation messages while the form validity remains binary.

#### Related
* [Using Form State](../guides/UsingFormState.md)
* [API Reference: Update](../api/core/Update.md)
* [API Reference: State](../api/core/State.md)
