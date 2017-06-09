/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { initField, updateField } from '../model/actions'

import type { Field } from '../../types/Field'

type FieldProps = {
  data: Field,
  initField: Function,
  updateField: Function,

  initialState: Function,
  fieldId: string,
  formId: string
}

const mapStateToProps = ({ form }: Object, { fieldId, formId }: Object) => ({
  data: form[formId][fieldId] || {}
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
    )
})

export default function asField(Comp: any): any {
  class Field extends Component {
    constructor(props, context) {
      super(props, context)
      props.initField()
    }

    props: FieldProps

    render() {
      const {
        data: { value = '', isEnabled, isRequired, isValid, isTouched },
        updateField,
        ...otherProps
      } = this.props

      return (
        <Comp
          updateField={updateField}
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
