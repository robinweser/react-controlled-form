# Migration Guide

## 3.0.0

Coming form versions < 3.0.0 there's plenty of changes to migrate, but they're not as heavy as you might've thought.
In general, the whole API was converted to a render-props based approach rather than a HoC based approach. This means instead of HoCs, we now have dedicated React components that render the associated nodes.

Apart form that, a lot of APIs have been removed for simplicity. All that remains is a [Field](../api/core/Field.md) and a [Form](../api/core/Form.md) component which are the render-props equivalent to *asField* and *Form*. All other HoCs such as *asSubmit*, *asReset*, *asUpdate*, *withData* and *withState* are not needed anymore, as everything can be rendered directly within the [Form](../api/core/Form.md) **render**-function.

### Examples

##### Field vs. asField
```javascript
// asField (1.x.x - 2.x.x)
function Input({ value, updateField }) {
  const onChange = e => updateField({ value: e.target.value })

  return (
    <input value={value} onChange={onChange} />
  )
}

export default asField(Input)
```

```javascript
// Field (3.x.x)
function Input({ value, updateField }) {
  const onChange = e => updateField({ value: e.target.value })

  return (
    <input value={value} onChange={onChange} />
  )
}

export default ({ fieldId }) => (
  <Field fieldId={fieldId} render={Input} />
)
```


##### withData vs. implicit rendering
Given the following Display component.

```javascript 
export default function Display({ data }) {
  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
```

------ 

```javascript
// withData (1.x.x - 2.x.x)
const DataDisplay = withData(Display)

// Usage
<Form formId="foo">
  <DataDisplay />
</Form>
```

```javascript
// implicit (3.x.x)
function FormWithData({ data }) {
  return (
    <form>
      <Display data={data} />
    </form>
  )
}

// Usage
<Form formId="foo" render={FormWithData} />
```