/* @flow */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getContext, compose } from 'recompose'
import { connect } from 'react-redux'

import { mapStateToProps, mapDispatchToProps } from '../mapping/field'

import type { Field } from '../../types/Field'

type FieldProps = {
  formId: string,
  data: Field,
  state: Object,
  initField: Function,
  updateField: Function,
  updateState: Function,
  fieldId: string,
}

export default function asField(
  Comp: any,
  defaultField: Function | Field = {}
): any {
  class Field extends Component {
    constructor(props, context) {
      super(props, context)

      if (typeof defaultField === 'function') {
        props.initField(defaultField(props))
      } else {
        props.initField(defaultField)
      }
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
