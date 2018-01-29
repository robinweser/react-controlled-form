/* @flow */
import {
  initField as initFieldAction,
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import type { Field } from '../../types/Field'

export function mapStateToProps({ form }: Object, { fieldId, formId }: Object) {
  return {
    data: form[formId].data[fieldId] || {},
    state: form[formId].state,
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
