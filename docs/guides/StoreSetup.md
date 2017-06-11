## Store Setup

The API is build on Redux and therefore it is required to use Redux with React.<br>
You have to ensure that the Redux store is provided using the `<Provider>` component from react-redux.

Despite using Redux, we need to include a special form reducer with the `form` key.<br>
This is important, as the API requires that `state.form` is used.

```javascript
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { formReducer } from 'react-controlled-form'

import App from './path-to-your-root'

const store = createStore(combineReducers({
  form: formReducer,
  /* any other custom reducers */
}))

render((
    <Provider store={store}>
      <App>
    </Provider>
  ),
  /* your root DOM node */
)
```

Once that's done, we're able to use forms anywhere in our application.
