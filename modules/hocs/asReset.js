/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { resetForm } from '../model/actions'

const mapDispatchToProps = (dispatch: Function, { formId }: Object) => ({
  resetForm: () => dispatch(resetForm(formId))
})

export default function asReset(component: any): any {
  return compose(
    getContext({ formId: PropTypes.string }),
    connect(undefined, mapDispatchToProps)
  )(component)
}
