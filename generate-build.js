const fs = require('fs');

console.log('Incrementing build number...');
fs.readFile('src/metadata.json', (readErr, content) => {
  if (readErr) throw readErr;
  const metadata = JSON.parse(content);
  metadata.build += 1;
  fs.writeFile('src/metadata.json', JSON.stringify(metadata), writeErr => {
    if (writeErr) throw writeErr;
    console.log(`Current build number: ${metadata.build}`);
  });
});
