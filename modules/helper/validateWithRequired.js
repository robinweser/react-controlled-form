/* @flow */
import type { Field } from '../../types/Field'

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
  if (isRequired) {
    return !isFalsyValue(value)
  }

  return true
}
