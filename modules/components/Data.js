/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { mapStateToProps } from '../mapping/data'

function Data({ formId, isFormValid, data, render }) {
  return render({ formId, isFormValid, data })
}

export default compose(
  getContext({ formId: PropTypes.string, isFormValid: PropTypes.bool }),
  connect(mapStateToProps)
)(Data)
