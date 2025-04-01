const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, 'src', 'app');

// Rename auth and dashboard directories to include parentheses
if (fs.existsSync(path.join(srcPath, 'auth'))) {
  fs.renameSync(
    path.join(srcPath, 'auth'),
    path.join(srcPath, '(auth)')
  );
  console.log('Renamed auth directory to (auth)');
}

if (fs.existsSync(path.join(srcPath, 'dashboard'))) {
  fs.renameSync(
    path.join(srcPath, 'dashboard'),
    path.join(srcPath, '(dashboard)')
  );
  console.log('Renamed dashboard directory to (dashboard)');
}

console.log('Directory renaming complete!');
