import React from 'react';
import ReactDOM from 'react-dom';

import oauth from 'panoptes-client/lib/oauth';
import { config } from './config';

import '../node_modules/zoo-grommet/dist/zoo-grommet.css';
import '../node_modules/zooniverse-react-components/lib/zooniverse-react-components.css';

import './index.css';
import { UserProvider } from './context/UserContext';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

oauth.init(config.panoptesAppId, { customRedirects: true })
  .then(() => {
    ReactDOM.render(
      <UserProvider>
        <App />
      </UserProvider>,
      document.getElementById('root'),
    );
    registerServiceWorker();
  });
