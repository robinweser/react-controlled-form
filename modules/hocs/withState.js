/* @flow */
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

const defaultMapper = state => ({ state })

export default function withState(
  mapStateToProps: Function = defaultMapper
): any {
  const mapState = ({ form }: Object, ownProps: Object) =>
    mapStateToProps(form[ownProps.formId].state, ownProps)

  return (component: any) =>
    compose(getContext({ formId: PropTypes.string }), connect(mapState))(
      component
    )
}
