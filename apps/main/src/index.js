import React from 'react'
import ReactDOM from 'react-dom'

import './config'
import './index.css';
import App from './containers/app'
import registerServiceWorker from './registerServiceWorker';
// import ClientStore from './stores/client'

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
