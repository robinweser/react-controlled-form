/* @flow */
import composeFieldData from '../../utils/composeFieldData'

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
        [fieldId]: composeFieldData(state[formId].data[fieldId], {
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
