/* @flow */
import type { Action } from '../../../types/Action'

export default function updateField(
  state: Object,
  { payload: { formId, newState } }: Action
): Object {
  return {
    ...state,
    [formId]: {
      ...state[formId],
      state: {
        ...state[formId].state,
        ...newState,
      },
    },
  }
}
