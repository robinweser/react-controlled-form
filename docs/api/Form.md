# `<Form>`

The Form component is used to declare a new form context. Every form field within it's children is automatically assigned it.

## Props
| Prop | Type | Description |
| --- | --- | --- |
| formId | (*string*) | A unique identifier which is used to save the whole form data in our Redux store. |
| initialFields | (*Object?*) | Defines initial field data. Every field value is optional. |
| enabledDefault | (*boolean?*) | Indicates wether `event.preventDefault` is executed or not.<br>Defaults to `false`. |
| validate | (*Function?*) | A function to perform additional form validation.<br>It's first parameter matches the [callback shape](#callback-shape). |
| onChange | (*Function?*) | A function that is triggered on **every** change.<br>It's first parameter matches the [callback shape](#callback-shape). It additionally also receives `previousData` and `previousState` which contain the field data and form state before the change happened. |
| onSubmit | (*Function?*) | A function that is triggered if the form gets submitted.<br>It's first parameter matches the [callback shape](#callback-shape). It additionally also receives the `resetForm`-method to reset the form on successful submits. |

#### Callback Shape
```
FieldData = {
  value: any,
  isDisabled: boolean,
  isRequired: boolean,
  isValid: boolean
}

CallbackShape = {
  data: { [fieldId: string]: FieldData },
  state: { [key: string]: any },
  updateField: Function(fieldId: string, data: FieldData),
  updateState: Function(newState: Object)
}
```

## Example
```javascript
import { Form } from 'react-controlled-form'

const initialFields = {
  country: {
    isRequired: true,
    isValid: false
  },
  language: {
    isEnabled: false
  }
}

function onChange({ updateField, data }) {
  // enable the language field and set 'English' as default
  // as soon as country has been set
  if (data.country.isTouched && data.country.value) {
    updateField('language', {
      value: 'English',
      isEnabled: true
    })
  }
}

export default () => (
  <Form formId="contact" initialFields={initialFields} onChange={onChange}>
    /* form fields */
  </Form>
)
```
