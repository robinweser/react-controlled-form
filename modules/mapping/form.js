import {
  initForm as initFormAction,
  resetForm as resetFormAction,
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import { REDUCER_NAMESPACE } from '../model/reducers/_namespace'

import type { Field } from '../../types/Field'

export function mapStateToProps(store: Object, { formId }: Object) {
  return {
    data:
      store[REDUCER_NAMESPACE][formId] && store[REDUCER_NAMESPACE][formId].data,
    state:
      store[REDUCER_NAMESPACE][formId] &&
      store[REDUCER_NAMESPACE][formId].state,
  }
}

export function mapDispatchToProps(dispatch: Function, { formId }: Object) {
  return {
    initForm: (initialFields: Object, initialState: Object) =>
      dispatch(initFormAction({ formId, initialFields, initialState })),
    resetForm: () => dispatch(resetFormAction({ formId })),
    updateField: (fieldId: string, fieldData: Field) =>
      dispatch(
        updateFieldAction({
          formId,
          fieldId,
          ...fieldData,
        })
      ),
    updateState: (newState: Object) =>
      dispatch(
        updateStateAction({
          formId,
          newState,
        })
      ),
  }
}
