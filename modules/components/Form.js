/* @flow */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shallowEqual } from 'recompose'

import objectReduce from 'fast-loops/lib/objectReduce'

import { mapStateToProps, mapDispatchToProps } from '../mapping/form'

import type { Field } from '../../types/Field'

type FormProps = {
  render: Function,
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
  updateState: Function,
}

class Form extends Component {
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
    isFormValid: PropTypes.bool.isRequired,
    submitForm: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    props.initForm(props.initialFields, props.initialState)
  }

  getChildContext() {
    return {
      formId: this.props.formId,
      submitForm: this.onSubmit,
      resetForm: this.onReset,
      isFormValid: this.validate(),
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
        updateState,
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
      onSubmit,
    } = this.props

    if (onSubmit) {
      onSubmit({
        data,
        state,
        updateField,
        updateState,
        resetForm: this.onReset,
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
      onChange,
      data,
      state,
      updateField,
      updateState,
      render,
    } = this.props

    return render({
      onSubmit: this.onSubmit,
      updateField,
      updateState,
      formId,
      validate,
      onChange,
      data,
      state,
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
