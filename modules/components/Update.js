/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { mapDispatchToProps } from '../mapping/update'

function Update({ formId, isFormValid, updateState, updateField, render }) {
  return render({ formId, isFormValid, updateState, updateField })
}

export default compose(
  getContext({ formId: PropTypes.string, isFormValid: PropTypes.func }),
  connect(undefined, mapDispatchToProps)
)(Update)
