/* @flow */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shallowEqual } from 'recompose'

import objectReduce from 'fast-loops/lib/objectReduce'
import arrayEach from 'fast-loops/lib/arrayEach'

import { mapStateToProps, mapDispatchToProps } from '../mapping/form'

import type { Field, Data } from '../../types/Field'

type FormProps = {
  render: Function,
  formId: string,
  initialFields?: Data,
  initialState?: Object,
  validate?: Function,
  onChange?: Function,

  data: Field,
  state: Object,
  initForm: Function,
  resetForm: Function,
  updateField: Function,
  updateState: Function,
}

class Form extends Component {
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
    subscribeToReinit: PropTypes.func,
  }

  constructor(props, context) {
    super(props, context)

    const { initForm, initialFields, initialState } = props
    initForm(initialFields, initialState)

    this.initialized = false
    this.reinitListeners = []
  }

  getChildContext() {
    return {
      formId: this.props.formId,
      subscribeToReinit: this._subscribeToReinit,
    }
  }

  /* eslint-disable consistent-return */
  componentWillReceiveProps(newProps) {
    const {
      data,
      state,
      initialFields = {},
      initialState = {},
      updateField,
      updateState,
      onChange,
    } = this.props

    const newInitialFields = newProps.initialFields || {}
    const newInitialState = newProps.initialState || {}

    // enabling re-initialisation
    if (
      !shallowEqual(initialFields, newInitialFields) ||
      !shallowEqual(initialState, newInitialState)
    ) {
      this.props.initForm(
        {
          ...initialFields,
          ...newInitialFields,
        },
        {
          ...initialState,
          ...newInitialState,
        }
      )

      arrayEach(this.reinitListeners, callback => callback())
    }

    if (
      onChange &&
      this.initialized &&
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

    this.initialized = true
  }
  /* eslint-enable */

  reset = () => {
    this.props.resetForm()
  }

  validate = () => {
    const { data, state, validate } = this.props

    return objectReduce(
      data,
      (isFormValid, { isValid }) => isValid && isFormValid,
      validate ? validate(data, state) : true
    )
  }

  _subscribeToReinit = callback => {
    this.reinitListeners.push(callback)

    return () =>
      this.reinitListeners.splice(this.reinitListeners.indexOf(callback), 1)
  }

  props: FormProps
  initialized: boolean
  reinitListeners: Array<Function>

  render() {
    const { formId, data, state, updateField, updateState, render } = this.props

    if (!this.initialized) {
      // quick escape as the initial rerender will already be triggered
      // TODO: it's pretty ugly to require a full rerender, maybe we can fix that
      return null
    }

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
