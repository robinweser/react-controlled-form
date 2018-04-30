/* @flow */
import type { Action } from '../../../types/Action'

import composeData from '../composeData'

export default function initField(
  state: Object,
  {
    payload: {
      formId,
      fieldId,
      value = '',
      isEnabled = true,
      isRequired = false,
      isValid = true,
    },
  }: Action
): Object {
  const { _initial, ...oldData } = state[formId].data[fieldId] || {}

  const fieldData = composeData(
    {
      value,
      isEnabled,
      isRequired,
      isTouched: false,
      isValid,
    },
    oldData
  )

  return {
    ...state,
    [formId]: {
      ...state[formId],
      data: {
        ...state[formId].data,
        [fieldId]: {
          ...fieldData,
          _initial: fieldData,
        },
      },
    },
  }
}
