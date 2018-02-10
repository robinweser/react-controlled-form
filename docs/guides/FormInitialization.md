# Form Initialization

Sometimes, we want to initialize some form fields with default values or initial state. This can be especially helpful if we want to create persistent forms or auto-fill them with data received from a backend.

There are 5 different properties which we are able to initially set. Check out [Basics: Fields](../basics/Fields.md) to learn what they're used for. If not set, they will be automatically set to their default value.

| Property | Default |
| --- | --- |
| value | `''` |
| isEnabled | true |
| isRequired | false |
| isTouched | false |
| isValid | true |

There are two different ways to initialize the form.

* [Per-Field Initialization](#per-field-initialization)
* [Per-Component Initialization](#per-component-initialization)

## Per-Field Initialization
Per-Field Initialization is a form-based way to initialize special field instances and is only active for that single field instance.
To achieve that, we can pass an [`initialFields`](../api/Form.md#props) object to our wrapping [Form](../api/Form.md) component.<br><br>
The keys should match the `fieldId`s we pass to the field components inside the form while the value **must** be an object with field data values. We only have to provide the data we actually want to set initially, thus every data value is optional.

#### Example
```javascript
import { Form } from 'react-controlled-form'

const initialFields = {
  firstname: {
    isRequired: true
  },
  accepted_terms: {
    value: false,
    isValid: false,
    isRequired: true
  }
}

// Usage
<Form formId="user" initialFields={initialFields} render={...} />
```

## Per-Component Initialization
Instead of initializing each field instance separately, we can also add some default field data to the [Field](../api/Field.md) component. It will be used to initialize every field instance of that component.<br>

#### Example
```javascript
import { Field } from 'react-controlled-form'

function Input({ fieldId, defaultValue = '' }) {
  const renderInput = ({ value, updateField }) => (
    <input value={value} onChange={e => {
      const nextValue = e.target.value

      updateField({
        isValid: nextValue.length > 0,
        value: nextValue
      })
    }} />
  )

  return (
    <Field 
      fieldId={fieldId} 
      render={renderInput} 
      initialData={{
        isValid: defaultValue.length > 0,
        value: defaultValue,
        isRequired: true,
      }}
    />
  )
}
```

Now we are able to use the component and always have `isValid`, `isRequired` and `value` set automatically. If we pass a `defaultValue`-prop, it will automatically initialize the value and isValid field data property correctly.

## Precedence
We are also able to mix both methods to achieve even more precise initialization. While doing so, the per-field data will overwrite per-component data properties and merge non-conflicting ones.
