/* @flow */
import { PropTypes } from 'react'

import Box from '../components/Box'

type SubmitProps = {
  style?: Object,
  alignSelf?: string,
  children?: any
}

type SubmitContext = {
  submitForm: Function,
  isValid: boolean
}

export default function Submit(
  { children, alignSelf, style }: SubmitProps,
  { submitForm, isValid }: SubmitContext
) {
  return (
    <Box
      alignSelf={alignSelf || 'flex-start'}
      style={{
        border: 0,
        backgroundColor: 'transparent',
        opacity: isValid ? 1.0 : 0.5,
        ...style
      }}
      passThrough={['onClick']}
      onClick={submitForm}
    >
      {children}
    </Box>
  )
}

Submit.contextTypes = {
  formId: PropTypes.string.isRequired,
  submitForm: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  renderer: PropTypes.object
}
