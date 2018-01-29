/* @flow */
import composeData from '../composeData'

import type { Action } from '../../../types/Action'

export default function updateField(
  state: Object,
  {
    payload: {
      formId,
      fieldId,
      value,
      isEnabled,
      isRequired,
      isTouched = true,
      isValid,
    },
  }: Action
): Object {
  return {
    ...state,
    [formId]: {
      ...state[formId],
      data: {
        ...state[formId].data,
        [fieldId]: composeData(state[formId].data[fieldId], {
          isEnabled,
          isRequired,
          isValid,
          isTouched,
          value,
        }),
      },
    },
  }
}
