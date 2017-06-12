/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { shallowEqual } from 'recompose'

import objectReduce from '../utils/objectReduce'
import { initForm, resetForm, updateField } from '../model/actions'

import type { Field } from '../../types/Field'

type FormProps = {
  formId: string,
  initialFields: string,
  enableDefault?: boolean,
  validate?: Function,
  onChange?: Function,
  onSubmit?: Function,

  data: Object,
  initForm: Function,
  updateField: Function,
  resetForm: Function
}

class Form extends Component {
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    submitForm: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)

    props.initForm(props.initialFields)
  }

  getChildContext() {
    return {
      formId: this.props.formId,
      submitForm: this.onSubmit,
      isValid: this.validate()
    }
  }

  componentWillReceiveProps(newProps) {
    const { data, updateField, onChange } = this.props

    if (onChange && !shallowEqual(data, newProps.data)) {
      onChange({
        data: newProps.data,
        previousData: data,
        updateField
      })
    }
  }

  onSubmit = event => {
    const { data, updateField, resetForm, enableDefault, onSubmit } = this.props

    if (onSubmit) {
      onSubmit({
        data,
        updateField,
        resetForm
      })
    }

    if (event && event.preventDefault && !enableDefault) {
      event.preventDefault()
    }
  }

  validate = () => {
    const { data, validate } = this.props

    return objectReduce(
      data,
      (isFormValid, { isValid }) => isValid && isFormValid,
      validate ? validate(data) : true
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
      initForm,
      updateField,
      ...otherProps
    } = this.props

    return <form {...otherProps} onSubmit={onSubmit} />
  }
}

const mapStateToProps = ({ form }: Object, { formId }: Object) => ({
  data: form[formId]
})

const mapDispatchToProps = (dispatch: Function, { formId }: Object) => ({
  initForm: (initialFields: Object) =>
    dispatch(initForm({ formId, initialFields })),
  resetForm: () => dispatch(resetForm(formId)),
  updateField: (fieldId: string, fieldData: Field) =>
    dispatch(
      updateField({
        formId,
        fieldId,
        ...fieldData
      })
    )
})
export default connect(mapStateToProps, mapDispatchToProps)(Form)
