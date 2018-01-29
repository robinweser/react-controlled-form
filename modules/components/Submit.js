/* @flow */
import PropTypes from 'prop-types'
import { getContext } from 'recompose'

function Submit({ formId, submitForm, isFormValid, render }) {
  return render({ formId, submitForm, isFormValid })
}

export default getContext({
  formId: PropTypes.string,
  submitForm: PropTypes.func,
  isFormValid: PropTypes.bool,
})(Submit)
