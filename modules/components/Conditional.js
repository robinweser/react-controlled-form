/* @flow */
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Box } from 'kilvin'

type ConditionalFormFieldType = {
  condition: Function,
  formData: Object,
  children?: any
}

function ConditionalFormField(
  { condition, formData, children }: ConditionalFormFieldType,
  context
) {
  const isMatching: boolean = condition(
    formData[context && context.formId] || {}
  )

  return (
    <Box
      style={{
        display: isMatching ? 'flex' : 'none',
        pointerEvents: isMatching ? 'inherit' : 'none'
      }}
    >
      {children}
    </Box>
  )
}

ConditionalFormField.contextTypes = { formId: PropTypes.string }

const mapStateToProps = (state: Object) => ({ formData: state.form })
export default connect(mapStateToProps)(ConditionalFormField)
