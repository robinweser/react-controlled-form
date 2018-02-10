## Store Setup

The API is build on Redux and therefore it is required to use Redux with React.<br>
You have to ensure that the Redux store is provided using the [Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store) component from [react-redux](https://github.com/reactjs/react-redux).

Despite using Redux, we need to include a special form reducer object.<br>

```javascript
import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { formReducer } from 'react-controlled-form'

import App from './path-to-your-root'

const store = createStore(combineReducers({
  ...formReducer
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
