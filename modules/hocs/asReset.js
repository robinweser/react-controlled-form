/* @flow */
import PropTypes from 'prop-types'
import { getContext } from 'recompose'

export default function asReset(component: any): any {
  return getContext({ formId: PropTypes.string, resetForm: PropTypes.func })(
    component
  )
}
