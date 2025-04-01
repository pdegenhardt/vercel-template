/**
 * NextAuth utilities
 */

const { logger } = require('./logger');
const { generateRandomString } = require('./utils');

// Generate NextAuth secret
function generateNextAuthSecret() {
  logger.step('Generating NextAuth secret');
  const secret = generateRandomString(32);
  logger.success(`NextAuth secret generated: ${secret.substr(0, 8)}...`);
  return secret;
}

module.exports = {
  generateNextAuthSecret
};
