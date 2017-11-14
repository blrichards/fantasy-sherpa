import React from 'react';
import ReactDOM from 'react-dom';

import './Config'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ClientStore from './Stores/Client'

ReactDOM.render(<App client={ClientStore} />, document.getElementById('root'));
registerServiceWorker();
