/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shallowEqual } from 'recompose'

import objectReduce from '../utils/objectReduce'
import {
  initForm as initFormAction,
  updateField as updateFieldAction,
  updateState as updateStateAction
} from '../model/actions'

import type { Field } from '../../types/Field'

type FormProps = {
  formId: string,
  initialFields?: Object,
  initialState?: Object,
  enableDefault?: boolean,
  validate?: Function,
  onChange?: Function,
  onSubmit?: Function,

  data: Object,
  state: Object,
  initForm: Function,
  updateField: Function,
  updateState: Function
}

class Form extends Component {
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
    isFormValid: PropTypes.bool.isRequired,
    submitForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    const { initForm, initialFields, initialState } = props
    initForm(initialFields, initialState)
  }

  getChildContext() {
    return {
      formId: this.props.formId,
      submitForm: this.onSubmit,
      resetForm: this.onReset,
      isFormValid: this.validate()
    }
  }

  componentWillReceiveProps(newProps) {
    const { data, state, updateField, updateState, onChange } = this.props

    // hook to save the initial data and state
    // after all fields have been initialized
    if (!this.initialized) {
      this.initialFields = newProps.data
      this.initialState = newProps.state
      this.initialized = true
      // we won't call onChange during initialization
      return
    }

    if (
      onChange &&
      (!shallowEqual(data, newProps.data) ||
        !shallowEqual(state, newProps.state))
    ) {
      onChange({
        data: newProps.data,
        previousData: data,
        state: newProps.state,
        previousState: state,
        updateField,
        updateState
      })
    }
  }

  onSubmit = event => {
    const {
      data,
      state,
      updateField,
      updateState,
      enableDefault,
      onSubmit
    } = this.props

    if (onSubmit) {
      onSubmit({
        data,
        state,
        updateField,
        updateState,
        resetForm: this.onReset
      })
    }

    if (event && event.preventDefault && !enableDefault) {
      event.preventDefault()
    }
  }

  onReset = () => {
    this.props.initForm(this.initialFields, this.initialState)
  }

  validate = () => {
    const { data, state, validate } = this.props

    return objectReduce(
      data,
      (isFormValid, { isValid }) => isValid && isFormValid,
      validate ? validate(data, state) : true
    )
  }

  props: FormProps
  initialFields: { [fieldId: string]: Field }
  initialState: Object
  initialized: boolean

  render() {
    const {
      formId,
      validate,
      onSubmit,
      onChange,
      data,
      state,
      initialFields,
      initForm,
      updateField,
      updateState,
      ...otherProps
    } = this.props

    return <form {...otherProps} onSubmit={this.onSubmit} />
  }
}

const mapStateToProps = ({ form }: Object, { formId }: Object) => ({
  data: form[formId] && form[formId].data,
  state: form[formId] && form[formId].state
})

const mapDispatchToProps = (dispatch: Function, { formId }: Object) => ({
  initForm: (initialFields: Object, initialState: Object) =>
    dispatch(initFormAction({ formId, initialFields, initialState })),
  updateField: (fieldId: string, fieldData: Field) =>
    dispatch(
      updateFieldAction({
        formId,
        fieldId,
        ...fieldData
      })
    ),
  updateState: (newState: Object) =>
    dispatch(
      updateStateAction({
        formId,
        newState
      })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
