# Fields

As said before, fields are the basic building blocks of all forms. They reflect the data model and accept user input to collect the required data.<br>
Within react-controlled-form, you create your very own fields with all the components and elements you already know from basic HTML, while we provide you with everything you need to do that.

## Field Data
Every field is linked to some data in our Redux store, which always has the following shape:

```
{
  value,
  isEnabled,
  isRequired,
  isTouched,
  isValid
}
```
The properties should be self-describing and are everything you need to know in order to create any possible form field.


Check out the [`asField` API Reference](../api/asField.md) for further information on each property's type.

#### Related
* [Updating Fields](../guides/UpdatingFields.md)
* [Form Validation - Per-Field Validation](../guides/FormValidation#per-field-validation.md)
* [API Reference - `asField`](../api/asField.md)
