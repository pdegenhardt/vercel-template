/**
 * Dependencies management module
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { logger } = require('./logger');
const { APP_DIR } = require('./project');

// Install dependencies if needed
async function installDependencies() {
  logger.step('Checking and installing dependencies');
  
  try {
    // Check if node_modules exists
    if (!fs.existsSync(path.join(APP_DIR, 'node_modules'))) {
      logger.info('Node modules not found, installing dependencies...');
      execSync('npm install', { cwd: APP_DIR, stdio: 'inherit' });
      logger.success('Dependencies installed successfully');
    } else {
      logger.info('Node modules already exist, skipping installation');
    }
    
    return true;
  } catch (error) {
    logger.error(`Failed to install dependencies: ${error.message}`);
    logger.info('You may need to run "npm install" manually in the app-code directory');
    return false;
  }
}

module.exports = {
  installDependencies
};
