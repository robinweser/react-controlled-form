/* @flow */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from '../mapping/field'

import type { Field as FieldType } from '../../types/Field'

type FieldProps = {
  // public API
  fieldId: string,
  initialData: FieldType,
  render: Function,

  // passed via Redux / context
  formId: string,
  data: FieldType,
  state: Object,
  initField: Function,
  updateField: Function,
  updateState: Function,
  isFormValid: boolean,
}

class Field extends Component {
  constructor(props, context) {
    super(props, context)

    const { initField, initialData = {} } = props
    initField(initialData)
  }

  props: FieldProps

  render() {
    const {
      data: { value = '', isEnabled, isRequired, isValid, isTouched },
      state,
      render,
      updateField,
      updateState,
      formId,
      fieldId,
      isFormValid,
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
      isFormValid,
    })
  }
}

export default compose(
  getContext({ formId: PropTypes.string, isFormValid: PropTypes.func }),
  connect(mapStateToProps, mapDispatchToProps)
)(Field)
