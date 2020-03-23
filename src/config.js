/*
Configuration Settings
----------------------
The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:
- An ?env query string, e.g. localhost:3000?env=production
- The NODE_ENV environment variable on the system running the app.
*/

import locationMatch from './lib/location-match';

const DEFAULT_ENV = 'development';
const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromBrowser || envFromShell || DEFAULT_ENV;

if (!env.match(/^(production|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

const projectIdFromBrowser = locationMatch(/\W?project_id=(\w+)/);

const baseConfig = {
  development: {
    caesar: 'https://caesar-staging.zooniverse.org',
    origin: window.location.href,
    projectId: projectIdFromBrowser || '1613',
    panoptesAppId:
      '16ac801e4ad438d929d30668206df31294e7a7222ce3f449a1c4b45cd80d44cc',
    stats: 'https://stats-staging.zooniverse.org',
    zooniverse: 'https://master.pfe-preview.zooniverse.org'
  },
  production: {
    caesar: 'https://caesar.zooniverse.org',
    origin: window.location.href,
    panoptesAppId:
      '940c60fa02251f156c0d9129e3b8d885424fe729da4e4a7750525ca154bdb3d7',
    projectId: projectIdFromBrowser || '1558',
    stats: 'https://stats.zooniverse.org',
    zooniverse: 'https://www.zooniverse.org'
  }
};

baseConfig.test = baseConfig.development; // test === development, as far as we're concerned.

const config = baseConfig[env];

export { env, config };
