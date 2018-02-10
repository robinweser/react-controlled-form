/* @flow */
import {
  initField as initFieldAction,
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import { REDUCER_NAMESPACE } from '../model/reducers/_namespace'

import type { Field } from '../../types/Field'

export function mapStateToProps(store: Object, { fieldId, formId }: Object) {
  return {
    data: store[REDUCER_NAMESPACE][formId].data[fieldId] || {},
    state: store[REDUCER_NAMESPACE][formId].state,
  }
}

export function mapDispatchToProps(
  dispatch: Function,
  { fieldId, formId }: Object
) {
  return {
    initField: (fieldData: Field) =>
      dispatch(initFieldAction({ formId, fieldId, ...fieldData })),
    updateField: (fieldData: Field) =>
      dispatch(
        updateFieldAction({
          formId,
          fieldId,
          ...fieldData,
        })
      ),
    updateState: (newState: any) =>
      dispatch(
        updateStateAction({
          formId,
          newState,
        })
      ),
  }
}
