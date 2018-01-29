/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

const defaultMapper = state => ({ state })

const mapState = (
  { form }: Object,
  { mapStateToProps = defaultMapper, ...ownProps }: Object
) => mapStateToProps(form[ownProps.formId].state, ownProps)

function State({ formId, isFormValid, render, ...otherProps }) {
  return render({ formId, isFormValid, ...otherProps })
}

export default compose(
  getContext({ formId: PropTypes.string, isFormValid: PropTypes.bool }),
  connect(mapState)
)(State)
