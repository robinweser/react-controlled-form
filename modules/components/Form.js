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
  validate?: Function,
  onChange?: Function,

  data: Object,
  state: Object,
  initForm: Function,
  updateField: Function,
  updateState: Function,
}

class Form extends Component {
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context)

    props.initForm(props.initialFields, props.initialState)
  }

  getChildContext() {
    return {
      formId: this.props.formId,
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
        reset: this.reset,
        validate: this.validate,
        data: newProps.data,
        previousData: data,
        state: newProps.state,
        previousState: state,
        updateField,
        updateState,
      })
    }
  }

  reset = () => {
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
    const { formId, data, state, updateField, updateState, render } = this.props

    return render({
      reset: this.reset,
      validate: this.validate,
      updateField,
      updateState,
      formId,
      data,
      state,
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
