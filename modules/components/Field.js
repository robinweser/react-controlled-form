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
    console.log(`${this.props.formId}.${this.props.fieldId} SCU`);
    
    if (this.props.children !== nextProps.children) {
      return true
    }
    
    const sameRF = this.props.render === nextProps.render;
    if (!sameRF) {
      console.log('Render function differs!')
      return true
    }
    const sameState = rfc(this.state, nextState)
    if (!sameState) {
      console.log('State differs!')
      return true
    }
    const sameFormState = rfc(this.props.state, nextProps.state)
    if (!sameFormState) {
      console.log('FormState differs!')
      return true
    }
    const sameData = rfc(this.props.data, nextProps.data)
    if (!sameData) {
      console.log('Form Data prop differs!')
      return true
    }
    const sameFormId = this.props.formId === nextProps.formId
    if (!sameFormId) {
      console.log('formId differs!')
      return true
    }
    const sameFieldId = this.props.fieldId === nextProps.fieldId
    if (!sameFieldId) {
      console.log('fieldId differs!')
      return true
    }
  
    if (this.props.initialData !== nextProps.initialData) {
      console.log('initialData differs!')
      return true
    }
    if (this.props.initialState !== nextProps.initialState) {
      console.log('initialState differs!')
      return true
    }
  
    console.log(`${this.props.formId}.${this.props.fieldId} NO NEED TO UPDATE`);
    return false;
    // return !(sameState && sameFormState && sameData && sameId)
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
