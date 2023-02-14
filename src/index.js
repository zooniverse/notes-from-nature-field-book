/* eslint react/jsx-filename-extension: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import oauth from 'panoptes-client/lib/oauth';

import 'zoo-grommet/dist/zoo-grommet.css';
import 'zooniverse-react-components/lib/zooniverse-react-components.css';

import './index.css';

import { config } from './config';
import App from './components/App';
import { unregister } from './registerServiceWorker';

function removeHash() {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
}

oauth.init(config.panoptesAppId, { customRedirects: true }).then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
  unregister();
  removeHash();
});

console.log(`Deployed commit: ${process.env.REACT_APP_HEAD_COMMIT}`);
