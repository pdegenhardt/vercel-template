/**
 * Project structure validation
 */

const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

// Configuration
const APP_DIR = path.join(__dirname, '..', 'app-code');
const AUTH_FILE = path.join(APP_DIR, 'src', 'lib', 'auth.ts');

// Check if we are in the project root
function checkProjectStructure() {
  logger.step('Checking project structure');
  
  if (!fs.existsSync(APP_DIR)) {
    logger.error(`Directory not found: ${APP_DIR}`);
    logger.error('Please run this script from the project root directory.');
    process.exit(1);
  }
  
  if (!fs.existsSync(path.join(APP_DIR, 'src'))) {
    logger.error(`Source directory not found: ${path.join(APP_DIR, 'src')}`);
    logger.error('The project structure does not match the expected layout.');
    process.exit(1);
  }
  
  if (!fs.existsSync(AUTH_FILE)) {
    logger.error(`Auth configuration file not found: ${AUTH_FILE}`);
    logger.error('The NextAuth configuration file is missing.');
    process.exit(1);
  }
  
  logger.success('Project structure looks correct.');
  return true;
}

module.exports = {
  APP_DIR,
  AUTH_FILE,
  checkProjectStructure
};
