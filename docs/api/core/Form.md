# Form

The Form component is used to declare a new form context.<br>Every form field within its children is automatically assigned to it.

## Props
| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| formId | (*string*) | |  A unique identifier which is used to save the whole form data in our Redux store. |
| initialFields | (*Object?*) | `{}` | Defines initial field data. Every field value is optional. |
| initialState | (*Object?*) | `{}` | Defines the initial form state. |
| validate | (*Function?*) | | A function to perform additional form validation.<br>It must follow the signature `(data, state) => boolean`. |
| onChange | (*Function?*) | | A function that is triggered on **every** change.<br>It's first parameter matches the [callback shape](#callback-shape). It additionally also receives `previousData` and `previousState` which contain the field data and form state before the change happened. |
| render | (*Function*) | | A render function that renders the component shape.<br>It's first parameter is an object containing the [render properties](#renderingproperties). |

#### Callback Shape
```
FieldData = {
  value: any,
  isEnabled: boolean,
  isRequired: boolean,
  isTouched: boolean,
  isValid: boolean
}

CallbackShape = {
  data: { [fieldId: string]: FieldData },
  state: { [key: string]: any },

  updateField: Function(fieldId: string, data: FieldData),
  updateState: Function(newState: Object),
  validate: Function,
  reset: Function
}
```

### Render Properties

| Property | Type | Description |
| --- | --- | --- |
| formId | (*string*) | The formId passed to the wrapping [Form](Form.md) component. |
| state | (*Object*) | The form-scoped state. |
| data | (*Object*) | An object containing all the form data. |
| updateField | (*Function*) | Updates the field data.<br>Accepts an object with `isEnabled`, `isRequired`, `isTouched`, `isValid` and `value`. Each value is optional though. |
| updateState | (*Function*) | Updates the form-scoped state.<br>Takes an object of new state keys and merges those with the existing state. |
| reset | (*Function*) | A special function that resets the form data and state to the initial values `initialFields` and `initialState` |
| validate | (*Function*) | A function that returns the form validity by checking each fields `isValid` value. It also includes the additional validation that can be passed to the form via the `validate` property. |

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

// Usage
<Form formId="contact" initialFields={initialFields} render={...} />
```

## Tips & Tricks

* In order to leverage all built-in features of HTML forms, it is required to wrap the rendered components with a `<form>` DOM element. If not required, you can also build forms only using fields and they will still be controlled, but you will not be able to simply submit the form.