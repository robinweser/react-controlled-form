/* @flow */
import objectReduce from 'fast-loops/lib/objectReduce'

import type { Action } from '../../../types/Action'

export default function resetForm(
  state: Object,
  { payload: { formId } }: Action
): Object {
  return {
    ...state,
    [formId]: {
      data: objectReduce(
        state[formId].data,
        (data, fieldData, fieldId) => {
          data[fieldId] = {
            ...fieldData,
            ...fieldData._initial,
          }
          return data
        },
        {}
      ),
      state: state[formId].state._initial,
    },
  }
}
