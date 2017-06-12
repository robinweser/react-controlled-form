/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { initField, updateField, updateState } from '../model/actions'

import type { Field } from '../../types/Field'

type FieldProps = {
  formId: string,
  data: Field,
  state: Object,
  initField: Function,
  updateField: Function,
  updateState: Function,

  fieldId: string
}

const mapStateToProps = ({ form }: Object, { fieldId, formId }: Object) => ({
  data: form[formId].data[fieldId] || {},
  state: form[formId].state
})

const mapDispatchToProps = (
  dispatch: Function,
  { fieldId, formId }: Object
) => ({
  initField: (fieldData: Field) =>
    dispatch(initField({ formId, fieldId, ...fieldData })),
  updateField: (fieldData: Field) =>
    dispatch(
      updateField({
        formId,
        fieldId,
        ...fieldData
      })
    ),
  updateState: newState =>
    dispatch(
      updateState({
        formId,
        newState
      })
    )
})

export default function asField(Comp: any, defaultData: Field = {}): any {
  class Field extends Component {
    constructor(props, context) {
      super(props, context)

      props.initField(defaultData)
    }

    props: FieldProps

    render() {
      const {
        data: { value = '', isEnabled, isRequired, isValid, isTouched },
        state,
        updateField,
        updateState,
        ...otherProps
      } = this.props

      return (
        <Comp
          updateField={updateField}
          updateState={updateState}
          state={state}
          value={value}
          isEnabled={isEnabled}
          isRequired={isRequired}
          isValid={isValid}
          isTouched={isTouched}
          {...otherProps}
        />
      )
    }
  }

  return compose(
    getContext({ formId: PropTypes.string }),
    connect(mapStateToProps, mapDispatchToProps)
  )(Field)
}
