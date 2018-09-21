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

// https://github.com/reduxjs/react-redux/issues/157#issuecomment-148333201
// https://stackoverflow.com/questions/46911024/how-do-i-avoid-re-rendering-a-connected-react-purecomponent-due-to-mapdispatchto/46918014#46918014
// Passing ownProps to the mapDispatchToProps was forcing the component
// to re-render on every interaction with the redux store, even unrelated to it,
// as the function changed every time and thus were not cached.
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
