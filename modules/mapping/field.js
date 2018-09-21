/* @flow */
import objectFilter from 'fast-loops/lib/objectFilter'

import {
  initField as initFieldAction,
  updateField as updateFieldAction,
  updateState as updateStateAction,
} from '../model/actions'

import { REDUCER_NAMESPACE } from '../model/reducers/_namespace'

import type { Field } from '../../types/Field'

export function mapStateToProps(store: Object, { fieldId, formId }: Object) {
  const filterInitial = obj =>
    objectFilter(obj, (value, key) => key !== '_initial')

  return {
    data: filterInitial(store[REDUCER_NAMESPACE][formId].data[fieldId] || {}),
    state: filterInitial(store[REDUCER_NAMESPACE][formId].state),
  }
}

// https://github.com/reduxjs/react-redux/issues/157#issuecomment-148333201
// https://stackoverflow.com/questions/46911024/how-do-i-avoid-re-rendering-a-connected-react-purecomponent-due-to-mapdispatchto/46918014#46918014
// Passing ownProps to the mapDispatchToProps was forcing the component
// to re-render on every interaction with the redux store, even unrelated to it,
// as the function changed every time and thus were not cached.
export function mapDispatchToProps(
  dispatch: Function,
  { fieldId, formId }: Object
) {
  return {
    initField: (fieldData: Field, initialState: Object) =>
      dispatch(
        initFieldAction({ formId, fieldId, ...fieldData, initialState })
      ),
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
