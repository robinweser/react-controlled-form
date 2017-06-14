/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

const defaultMapper = data => ({ data })

export default function withData(
  mapDataToProps: Function = defaultMapper
): any {
  const mapStateToProps = ({ form }: Object, ownProps: Object) =>
    mapDataToProps(form[ownProps.formId].data, ownProps)

  return (component: any) =>
    compose(
      getContext({ formId: PropTypes.string, isFormValid: PropTypes.bool }),
      connect(mapStateToProps)
    )(component)
}
