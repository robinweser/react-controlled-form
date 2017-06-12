/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shallowEqual } from 'recompose'

import objectReduce from '../utils/objectReduce'
import { initForm, resetForm, updateField, updateState } from '../model/actions'

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
  resetForm: Function,
  updateField: Function,
  updateState: Function
}

class Form extends Component {
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    submitForm: PropTypes.func.isRequired
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
      isValid: this.validate()
    }
  }

  componentWillReceiveProps(newProps) {
    const { data, state, updateField, updateState, onChange } = this.props

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
      resetForm,
      enableDefault,
      onSubmit
    } = this.props

    if (onSubmit) {
      onSubmit({
        data,
        state,
        updateField,
        updateState,
        resetForm
      })
    }

    if (event && event.preventDefault && !enableDefault) {
      event.preventDefault()
    }
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

  render() {
    const {
      formId,
      validate,
      onSubmit,
      onChange,
      data,
      state,
      initForm,
      updateField,
      updateState,
      ...otherProps
    } = this.props

    return <form {...otherProps} onSubmit={onSubmit} />
  }
}

const mapStateToProps = ({ form }: Object, { formId }: Object) => ({
  data: form[formId].data,
  state: form[formId].state
})

const mapDispatchToProps = (dispatch: Function, { formId }: Object) => ({
  initForm: (initialFields: Object, initialState: Object) =>
    dispatch(initForm({ formId, initialFields, initialState })),
  resetForm: () => dispatch(resetForm(formId)),
  updateField: (fieldId: string, fieldData: Field) =>
    dispatch(
      updateField({
        formId,
        fieldId,
        ...fieldData
      })
    ),
  updateState: (newState: Object) =>
    dispatch(
      updateState({
        formId,
        newState
      })
    )
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)
