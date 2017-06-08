/* @flow */
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Box, Text } from 'kilvin'

import Details from '../components/Details'
import InputField from '../components/InputField'

import { updateForm, initField } from '../actions/form'

class Input extends Component {
  static contextTypes = {
    formId: PropTypes.string.isRequired,
    theme: PropTypes.object
  };

  props: {
    fieldId: string,
    name?: string,
    placeholder?: string,
    updateForm: Function,
    onInput?: Function,
    formData: Object,
    id?: string,
    type?: string,
    warning?: string,
    validate?: Function,
    disabled?: Boolean,
    defaultValue?: any,
    required?: boolean
  };

  constructor(props, context) {
    super(props, context)

    props.initField(
      context.formId,
      props.fieldId,
      props.required,
      props.defaultValue
    )
  }

  validateValue = (value) => {
    const isValid = this.props.validate && value.length > 0
      ? this.props.validate(value)
      : true

    if (this.props.required) {
      return value.length !== 0 && isValid
    }

    return isValid
  };

  onInput = (event: Object) => {
    const value = event.target.value

    if (this.props.onInput) {
      this.props.onInput({
        event,
        updateFormField: (fieldId, val, isValid) =>
          this.props.updateForm(this.context.formId, fieldId, val, isValid)
      })
    }

    this.props.updateForm(
      this.context.formId,
      this.props.fieldId,
      value,
      this.validateValue(value)
    )
  };

  getFieldData = (props) => {
    const formData = props.formData[this.context.formId] || {}
    return formData[props.fieldId] || {}
  };

  getFieldWarning = (fieldData, warning) => {
    const { value, isValid, isRequired, isTouched } = fieldData
    if (!isValid) {
      if (isRequired && isTouched && value.length === 0) {
        return 'Required'
      }
      return warning
    }

    return ''
  };

  render() {
    const {
      name,
      type = 'text',
      id,
      placeholder,
      disabled,
      defaultValue
    } = this.props
    const fieldData = this.getFieldData(this.props)
    const { isValid, isTouched, value } = fieldData

    return (
      <InputField
        isValid={isValid !== false}
        isTouched={isTouched}
        value={value}
        defaultValue={defaultValue}
        onInput={this.onInput}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
        id={id}
        type={type}
      />
    )
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  updateForm: (formId, fieldId, value, isValid) =>
    dispatch(
      updateForm({
        formId,
        fieldId,
        value,
        isValid
      })
    ),
  initField: (formId, fieldId, isRequired = false, defaultValue) =>
    dispatch(
      initField({
        formId,
        fieldId,
        isRequired,
        defaultValue
      })
    )
})

const mapStateToProps = (state: Object) => ({ formData: state.form })
export default connect(mapStateToProps, mapDispatchToProps)(Input)
