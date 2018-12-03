// Try and match the window.location.search property against a regex. Basically mimics
// the CoffeeScript existential operator, in case we're not in a browser.

function locationMatch(regex) {
  let match;
  if (
    window &&
    typeof window.location !== 'undefined' &&
    window.location !== null
  ) {
    match = window.location.search.match(regex);
  }
  return match && match[1] ? match[1] : undefined;
}

export default locationMatch;
