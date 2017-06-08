import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { shallowEqual } from 'recompose'

import { initForm, updateForm } from '../actions/form'

function getCurrentPathName() {
  if (typeof window !== 'undefined') {
    return window.location.pathname
  }

  return global.__nextPathName
}

class Form extends Component {
  props: { formId: string, formData: Object, onSubmit?: Function };
  static childContextTypes = {
    formId: PropTypes.string.isRequired,
    isValid: PropTypes.bool.isRequired,
    submitForm: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context)
    this.formId = `${getCurrentPathName()}_${props.formId}`
    props.initForm(this.formId)
  }

  componentWillReceiveProps(newProps) {
    const newValues = this._getFormData(newProps)
    const oldValues = this._getFormData(this.props)

    if (
      this.props.onChange &&
      !shallowEqual(newValues.formValues, oldValues.formValues)
    ) {
      const { formValues, formData } = newValues

      this.props.onChange({
        formValues,
        formData,
        updateFormField: (fieldId, value, isValid) =>
          this.props.updateForm(this.formId, fieldId, value, isValid)
      })
    }
  }

  getChildContext() {
    return {
      formId: this.formId,
      submitForm: this._submitForm,
      isValid: this.validateForm()
    }
  }

  validateForm = () => {
    const data = this._getFormData(this.props)

    if (this.props.validate) {
      const isSpecialValid = this.props.validate(data)

      if (!isSpecialValid) {
        return false
      }
    }

    const { formData } = data
    return Object.keys(formData).reduce(
      (isValid, field) => {
        if (formData[field].isValid === false) {
          return false
        }
        return isValid
      },
      true
    )
  };

  _getFormData = (props) => {
    const formData = props.formData[this.formId] || {}
    const formValues = Object.keys(formData).reduce(
      (values, fieldId) => {
        values[fieldId] = formData[fieldId].value
        return values
      },
      {}
    )

    return {
      formData,
      formValues
    }
  };

  _submitForm = () => {
    this._onSubmit({})
  };

  _onSubmit = (event) => {
    const { formValues, formData } = this._getFormData(this.props)

    if (this.props.onSubmit) {
      this.props.onSubmit({
        event,
        formValues,
        formData,
        updateFormField: (fieldId, value, isValid) =>
          this.props.updateForm(this.formId, fieldId, value, isValid)
      })
    }

    if (event && event.preventDefault) {
      event.preventDefault()
    }

    return false
  };

  render() {
    return (
      <form
        ref={(el) => {
          this.formElement = el
        }}
        onSubmit={this._onSubmit}
        style={this.props.style}
      >
        {this.props.children}
      </form>
    )
  }
}

const mapStateToProps = (state: Object) => ({ formData: state.form })
const mapDispatchToProps = (dispatch: Function) => ({
  initForm: formId => dispatch(initForm(formId)),
  updateForm: (formId, fieldId, value, isValid) =>
    dispatch(
      updateForm({
        formId,
        fieldId,
        value,
        isValid
      })
    )
})
export default connect(mapStateToProps, mapDispatchToProps)(Form)
