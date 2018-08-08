/*
Configuration Settings
----------------------
The config settings change depending on which environment the app is running in.
By default, this is the development environment, but this can be changed either by:
- An ?env query string, e.g. localhost:3000?env=production
- The NODE_ENV environment variable on the system running the app.
 */

const DEFAULT_ENV = 'development';
// const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;
const env = envFromShell || DEFAULT_ENV; // envFromBrowser

if (!env.match(/^(production|staging|development)$/)) {
  throw new Error(`Error: Invalid Environment - ${env}`);
}

const baseConfig = {
  development: {
    panoptesAppId: '0c08643250c9bb681ceb857a43d62f5f23ad98540a494120665e678b1215a4b3',
    zooniverse: 'https://master.pfe-preview.zooniverse.org'
  },
  production: {
    panoptesAppId: '',
    zooniverse: 'https://www.zooniverse.org'
  }
};

baseConfig.staging = baseConfig.development;  //staging === development, as far as we're concerned.

const config = baseConfig[env];

export { env, config };

// Try and match the location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.
// function locationMatch(regex) {
//   var match;
//   if (typeof location !== 'undefined' && location !== null) {
//     match = location.search.match(regex);
//   }
//   return (match && match[1]) ? match[1] : undefined;
// }
