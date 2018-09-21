/* @flow */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'
import rfc from 'react-fast-compare'

import { mapStateToProps, mapDispatchToProps } from '../mapping/field'

import type { Field as FieldType } from '../../types/Field'

type FieldProps = {
  // public API
  fieldId: string,
  initialData: FieldType,
  initialState: Object,
  render: Function,

  // passed via Redux / context
  formId: string,
  data: FieldType,
  state: Object,
  initField: Function,
  updateField: Function,
  updateState: Function,
  subscribeToReinit: Function,
}

class Field extends Component {
  constructor(props, context) {
    super(props, context)

    const { initField, initialData, initialState, subscribeToReinit } = props

    const init = () => initField(initialData, initialState)
    this.unsubscribe = subscribeToReinit(init)
    init()
  }
  
  // Hotfix for https://github.com/rofrischmann/react-controlled-form/issues/39
  shouldComponentUpdate(nextProps, nextState) {
    // See https://github.com/facebook/react/issues/12185#issuecomment-364531032
    if (this.props.children !== nextProps.children) {
      return true
    }
    const diffRF = this.props.render === nextProps.render;
    if (diffRF) {
      return true
    }
    // Deep equalities
    const diffState = rfc(this.state, nextState)
    if (diffState) {
      return true
    }
    const diffFormState = rfc(this.props.state, nextProps.state)
    if (diffFormState) {
      return true
    }
    const diffData = rfc(this.props.data, nextProps.data)
    if (diffData) {
      return true
    }
    // Shallow ones
    const diffFormId = this.props.formId === nextProps.formId
    if (diffFormId) {
      return true
    }
    const diffFieldId = this.props.fieldId === nextProps.fieldId
    if (diffFieldId) {
      return true
    }
    const diffInitData = this.props.initialData !== nextProps.initialData
    if (diffInitData) {
      return true
    }
    const diffInitState = this.props.initialState !== nextProps.initialState
    if (diffInitState) {
      return true
    }
    
    // No need to update.
    return false;
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  props: FieldProps
  unsubscribe: Function

  render() {
    const {
      data: { value = '', isEnabled, isRequired, isValid, isTouched },
      state,
      render,
      updateField,
      updateState,
      formId,
      fieldId,
    } = this.props

    return render({
      value,
      isEnabled,
      isRequired,
      isValid,
      isTouched,
      state,
      updateField,
      updateState,
      formId,
      fieldId,
    })
  }
}

export default compose(
  getContext({ formId: PropTypes.string, subscribeToReinit: PropTypes.func }),
  connect(mapStateToProps, mapDispatchToProps)
)(Field)
