import {
  initForm as initFormAction,
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import type { Field } from '../../types/Field'

export function mapStateToProps({ form }: Object, { formId }: Object) {
  return {
    data: form[formId] && form[formId].data,
    state: form[formId] && form[formId].state,
  }
}

export function mapDispatchToProps(dispatch: Function, { formId }: Object) {
  return {
    initForm: (initialFields: Object, initialState: Object) =>
      dispatch(initFormAction({ formId, initialFields, initialState })),
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
