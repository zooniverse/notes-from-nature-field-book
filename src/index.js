import React from 'react';
import ReactDOM from 'react-dom';

import oauth from 'panoptes-client/lib/oauth';
import { config } from './config';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

oauth.init(config.panoptesAppId, { customRedirects: true })
  .then(() => {
    ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
  })
