/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

const defaultMapper = data => ({ data })

const mapStateToProps = (
  { form }: Object,
  { mapDataToProps = defaultMapper, ...ownProps }: Object
) => mapDataToProps(form[ownProps.formId].data, ownProps)

function Data({ formId, isFormValid, render, ...otherProps }) {
  return render({ formId, isFormValid, ...otherProps })
}

export default compose(
  getContext({ formId: PropTypes.string, isFormValid: PropTypes.bool }),
  connect(mapStateToProps)
)(Data)
