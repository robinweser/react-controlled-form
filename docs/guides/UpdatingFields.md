# Updating Fields

Updating field data is the most important task within our form. Without explicitly updating a form, we won't see any changes at all.

With every update we are able to change any of the [field data properties](../basics/Fields.md#field-data) which are:

* value
* isEnabled
* isRequired
* isTouched
* isValid

> If not set differently, `isTouched` will be set to `true` by default.

There are basically two common cases where we update our field data.
* [Update on User Input](#update-on-user-input)
* [Update on Form Change](#update-on-form-change)

## Update on User Input
The most common use case is to update the field value on user input. Thanks to React's synthetic events, this task is pretty simple for any built-in form field.

#### Example
```javascript
import { Field } from 'react-controlled-form'

const Input = ({ fieldId }) => (
  <Field fieldId={fieldId} render={({ value, updateField }) => (
    <input value={value} onChange={e => updateField({ value: e.target.value })} />
  )} />
)
```

## Update on Form Change
Despite updating values on user input, we trigger do some advanced updates on global form changes. For example, we want to enable field **[b]** if field **[a]** updates its value to `true`.

#### Example
```javascript
import { Form } from 'react-controlled-form'

const intialFields = {
  a: { value: false },
  b: { isEnabled: false }
}

function onChange({ data, updateField }) {
  if (data.a.value === true) {
    updateField('b', {
      isEnabled: true
    })
  }
}

// Usage
<Form
  formId="user"
  initialFields={initialFields}
  onChange={onChange}
  render={...} />
```
