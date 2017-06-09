/* @flow */
import type { Action } from '../../../types/Action'

export default function initForm(
  state: Object,
  { payload: { formId, initialFields = {} } }: Action
): Object {
  return {
    ...state,
    [formId]: initialFields
  }
}
