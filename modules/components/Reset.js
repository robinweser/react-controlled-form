/* @flow */
import PropTypes from 'prop-types'
import { getContext } from 'recompose'

function Reset({ formId, resetForm, isFormValid, render }) {
  return render({ formId, resetForm, isFormValid })
}

export default getContext({
  formId: PropTypes.string,
  resetForm: PropTypes.func,
  isFormValid: PropTypes.bool,
})(Reset)
