/* @flow */
import type { Action } from '../../../types/Action'

export default function initForm(
  state: Object,
  { payload: { formId, initialFields = {}, initialState = {} } }: Action
): Object {
  return {
    ...state,
    [formId]: {
      data: initialFields,
      state: initialState,
    },
  }
}
