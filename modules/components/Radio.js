/* @flow */
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RadioField from '../components/RadioField'

import { updateForm, initField } from '../actions/form'

class Radio extends Component {
  static contextTypes = { formId: PropTypes.string.isRequired };

  props: {
    color: string,
    fieldId: string,
    fieldIdIndex: string,
    updateForm: Function,
    initField: Function,
    formData: Object
  };

  constructor(props, context) {
    super(props, context)

    if (props.default) {
      props.initField(context.formId, props.fieldId, props.fieldIdIndex)
    }
  }

  onToggle = () => {
    this.props.updateForm(
      this.context.formId,
      this.props.fieldId,
      this.props.fieldIdIndex
    )
  };

  getFieldData = () => {
    const formData = this.props.formData[this.context.formId] || {}
    return formData[this.props.fieldId] || {}
  };

  render() {
    const { value } = this.getFieldData()

    return (
      <RadioField
        checked={value === this.props.fieldIdIndex}
        color={this.props.color}
        onClick={this.onToggle}
      />
    )
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  updateForm: (formId, fieldId, value) =>
    dispatch(
      updateForm({
        formId,
        fieldId,
        value,
        isValid: true
      })
    ),
  initField: (formId, fieldId, fieldIdIndex) =>
    dispatch(
      initField({
        formId,
        fieldId,
        defaultValue: fieldIdIndex,
        isRequired: false,
        isValid: true
      })
    )
})

const mapStateToProps = (state: Object) => ({ formData: state.form })
export default connect(mapStateToProps, mapDispatchToProps)(Radio)
