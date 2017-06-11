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
      isTouched,
      isValid
    }
  }: Action
): Object {
  return {
    ...state,
    [formId]: {
      ...state[formId],
      [fieldId]: composeFieldData(state[formId][fieldId], {
        isEnabled,
        isRequired,
        isValid,
        isTouched: isTouched || true,
        value
      })
    }
  }
}
