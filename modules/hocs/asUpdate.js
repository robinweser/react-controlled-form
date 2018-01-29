/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { mapDispatchToProps } from '../mapping/update'

export default function asUpdate(component: any): any {
  return compose(
    getContext({ formId: PropTypes.string }),
    connect(undefined, mapDispatchToProps)
  )(component)
}
