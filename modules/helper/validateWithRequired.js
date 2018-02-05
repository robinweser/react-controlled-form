/* @flow */
function isFalsyValue(value: any) {
  const valueType = typeof value

  if (valueType === 'string') {
    return value.trim().length === 0
  } else if (valueType === 'boolean') {
    return !value
  }

  return false
}

export default function validateWithRequired(value: any, isRequired: boolean) {
  return isRequired ? !isFalsyValue(value) : true
}
