import objectFilter from 'fast-loops/lib/objectFilter'
import objectReduce from 'fast-loops/lib/objectReduce'

import {
  initForm as initFormAction,
  resetForm as resetFormAction,
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import { REDUCER_NAMESPACE } from '../model/reducers/_namespace'

import type { Field } from '../../types/Field'

export function mapStateToProps(store: Object, { formId }: Object) {
  const filterInitial = obj =>
    objectFilter(obj, (value, key) => key !== '_initial')

  return {
    data: objectReduce(
      store[REDUCER_NAMESPACE][formId] && store[REDUCER_NAMESPACE][formId].data,
      (data, fieldData, fieldId) => {
        data[fieldId] = filterInitial(fieldData)
        return data
      },
      {}
    ),
    state: filterInitial(
      (store[REDUCER_NAMESPACE][formId] &&
        store[REDUCER_NAMESPACE][formId].state) ||
        {}
    ),
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
