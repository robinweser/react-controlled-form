# Forms

We all now what forms are, right? Instead of telling a lot about basic HTML forms, we just want to describe what a form is in context of react-controlled-form.

Within react-controlled-form we define forms with [fields](Fields.md). Those fields **must** be wrapped by a [Form](../api/core/Form.md) component, which is basically just a wrapper that scopes all field data to a specific store scope using the required `formId` property.<br>
Apart from that, we can use the [Form](../api/core/Form.md) component to handle data processing on form submit, set the initial field data values, perform global validation and react to any field data update.<br>
Everything else should be done within the fields directly.

#### Related
* [Form Initialization](../guides/FormInitialization.md)
* [Handling Submit](../guides/HandlingSubmit.md)
* [Form Validation: Global Validation](../guides/FormValidation#global-validation.md)
* [API Reference: Form](../api/core/Form.md)
