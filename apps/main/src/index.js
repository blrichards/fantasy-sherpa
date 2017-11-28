import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './config'
import createStore from './reducers'
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker';

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
