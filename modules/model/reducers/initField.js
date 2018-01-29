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
  return {
    ...state,
    [formId]: {
      ...state[formId],
      data: {
        ...state[formId].data,
        [fieldId]: composeData(
          {
            value,
            isEnabled,
            isRequired,
            isTouched: false,
            isValid,
          },
          state[formId].data[fieldId] || {}
        ),
      },
    },
  }
}
