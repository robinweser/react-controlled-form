/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import {
  updateField as updateFieldAction,
  updateState as updateStateAction
} from '../model/actions'

export default function asUpdate(component: any): any {
  const mapDispatchToProps = (dispatch: Function, { formId }: Object) => ({
    updateField: (fieldId: string, fieldData: Field) =>
      dispatch(
        updateFieldAction({
          formId,
          fieldId,
          ...fieldData
        })
      ),
    updateState: newState =>
      dispatch(
        updateStateAction({
          formId,
          newState
        })
      )
  })

  return compose(
    getContext({ formId: PropTypes.string }),
    connect(undefined, mapDispatchToProps)
  )(component)
}
