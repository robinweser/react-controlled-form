/* @flow */
import type { Action } from '../../../types/Action'

import composeFieldData from '../../utils/composeFieldData'

export default function initField(
  state: Object,
  {
    payload: {
      formId,
      fieldId,
      value = '',
      isEnabled = true,
      isRequired = false,
      isValid = true
    }
  }: Action
): Object {
  return {
    ...state,
    [formId]: {
      ...state[formId],
      data: {
        ...state[formId].data,
        [fieldId]: composeFieldData(
          {
            value,
            isEnabled,
            isRequired,
            isTouched: false,
            isValid
          },
          state[formId].data[fieldId] || {}
        )
      }
    }
  }
}
