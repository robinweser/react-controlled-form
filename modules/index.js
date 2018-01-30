import Data from './components/Data'
import Field from './components/Field'
import Form from './components/Form'
import Submit from './components/Submit'
import Reset from './components/Reset'
import State from './components/State'
import Update from './components/Update'

import asFieldHoC from './hocs/asField'
import asResetHoC from './hocs/asReset'
import asSubmitHoC from './hocs/asSubmit'
import asUpdateHoC from './hocs/asUpdate'
import withDataHoC from './hocs/withData'
import withStateHoC from './hocs/withState'

import validateWithRequired from './helper/validateWithRequired'
import mapDataToValues from './helper/mapDataToValues'

import formReducer from './model/reducers'

let warningLogged = false

function withDeprecation(api) {
  return (...args) => {
    if (!warningLogged) {
      warningLogged = true
      console.warn(
        `The higher-order components 'asField', 'asReset', 'asSubmit', 'asUpdate', 'withData' and 'withState' have been deprecated and will be removed with the next major release (3.0.0). 
For every HoC there is a new alternative component that leverages the render-props approach introducing many benefits and more flexibility.
Check the migration guide https://react-controlled-form.js.org/docs/introduction/Migration.html.`
      )
    }

    return api(...args)
  }
}

const asField = withDeprecation(asFieldHoC)
const asReset = withDeprecation(asResetHoC)
const asSubmit = withDeprecation(asSubmitHoC)
const asUpdate = withDeprecation(asUpdateHoC)
const withData = withDeprecation(withDataHoC)
const withState = withDeprecation(withStateHoC)

export {
  // components
  Data,
  Field,
  Form,
  Submit,
  Reset,
  State,
  Update,
  // deprecated: HoCs
  asField,
  asReset,
  asSubmit,
  asUpdate,
  withData,
  withState,
  // reducer
  formReducer,
  // helper
  validateWithRequired,
  mapDataToValues,
}
