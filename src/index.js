import React from 'react';
import ReactDOM from 'react-dom';
import oauth from 'panoptes-client/lib/oauth';

import '../node_modules/zoo-grommet/dist/zoo-grommet.css';
import '../node_modules/zooniverse-react-components/lib/zooniverse-react-components.css';

import './index.css';

import * as metadata from './metadata.json';
import { config } from './config';
import App from './components/App';
import { unregister } from './registerServiceWorker';

oauth.init(config.panoptesAppId, { customRedirects: true }).then(() => {
  ReactDOM.render(<App />, document.getElementById('root'));
  unregister();
});

console.log(`Current build number: ${metadata.build}`);
