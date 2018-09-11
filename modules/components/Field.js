/* @flow */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'
import rfc from 'react-fast-compare'

import { mapStateToProps, mapDispatchToProps } from '../mapping/field'

import type { Field as FieldType } from '../../types/Field'

type FieldProps = {
  // public API
  fieldId: string,
  initialData: FieldType,
  initialState: Object,
  render: Function,

  // passed via Redux / context
  formId: string,
  data: FieldType,
  state: Object,
  initField: Function,
  updateField: Function,
  updateState: Function,
  subscribeToReinit: Function,
}

class Field extends Component {
  constructor(props, context) {
    super(props, context)

    const { initField, initialData, initialState, subscribeToReinit } = props

    const init = () => initField(initialData, initialState)
    this.unsubscribe = subscribeToReinit(init)
    init()
  }
  
  // Hotfix for https://github.com/rofrischmann/react-controlled-form/issues/39
  shouldComponentUpdate(nextProps, nextState) {
    const sameState = rfc(this.state, nextState)
    const sameFormState = rfc(this.props.state, nextProps.state)
    const sameData = rfc(this.props.data, nextProps.data)
    const sameId = this.props.formId === nextProps.formId

    return !(sameState && sameFormState && sameData && sameId)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  props: FieldProps
  unsubscribe: Function

  render() {
    const {
      data: { value = '', isEnabled, isRequired, isValid, isTouched },
      state,
      render,
      updateField,
      updateState,
      formId,
      fieldId,
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
    })
  }
}

export default compose(
  getContext({ formId: PropTypes.string, subscribeToReinit: PropTypes.func }),
  connect(mapStateToProps, mapDispatchToProps)
)(Field)
