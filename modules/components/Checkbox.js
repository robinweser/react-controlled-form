/* @flow */
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Box, Text } from 'kilvin'

import CheckboxField from '../components/CheckboxField'
import Details from '../components/Details'

import { updateForm, initField } from '../actions/form'

class Checkbox extends Component {
  static contextTypes = { formId: PropTypes.string.isRequired };

  props: {
    fieldId: string,
    updateForm: Function,
    initField: Function,
    default?: boolean,
    required?: boolean,
    formData: Object
  };

  constructor(props, context) {
    super(props, context)

    props.initField(
      context.formId,
      props.fieldId,
      props.default !== undefined ? props.default : props.required,
      props.required
    )
  }

  onToggle = () => {
    const { value, isRequired } = this.getFieldData()

    this.props.updateForm(
      this.context.formId,
      this.props.fieldId,
      !value,
      !value === true || !isRequired
    )
  };

  getFieldData = () => {
    const formData = this.props.formData[this.context.formId] || {}
    return formData[this.props.fieldId] || {}
  };

  render() {
    const { value, isRequired, isTouched } = this.getFieldData()

    const showRequired = isRequired && isTouched && value !== true

    return (
      <CheckboxField
        checked={value}
        required={showRequired}
        onClick={this.onToggle}
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
  initField: (formId, fieldId, defaultValue = false, isRequired = false) =>
    dispatch(
      initField({
        formId,
        fieldId,
        defaultValue,
        isRequired,
        isValid: !isRequired || (isRequired && defaultValue)
      })
    )
})

const mapStateToProps = (state: Object) => ({ formData: state.form })
export default connect(mapStateToProps, mapDispatchToProps)(Checkbox)
