/**
 * Environment variables setup
 */

const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');
const { APP_DIR } = require('./project');

// Environment file paths
const ENV_FILE = path.join(APP_DIR, '.env.local');
const ENV_EXAMPLE_FILE = path.join(APP_DIR, '.env.example');

// Set up local development environment variables
async function setupEnvironmentVariables(nextAuthSecret, oauthConfig) {
  logger.step('Setting up environment variables');
  
  // Create/update .env.local
  let envContent = `NEXTAUTH_URL=http://localhost:3000\n`;
  envContent += `NEXTAUTH_SECRET=${nextAuthSecret}\n\n`;
  
  // Add OAuth provider information if available
  if (oauthConfig.google.clientId && oauthConfig.google.clientSecret) {
    envContent += `# Google OAuth\n`;
    envContent += `GOOGLE_CLIENT_ID=${oauthConfig.google.clientId}\n`;
    envContent += `GOOGLE_CLIENT_SECRET=${oauthConfig.google.clientSecret}\n\n`;
  }
  
  if (oauthConfig.github.clientId && oauthConfig.github.clientSecret) {
    envContent += `# GitHub OAuth\n`;
    envContent += `GITHUB_CLIENT_ID=${oauthConfig.github.clientId}\n`;
    envContent += `GITHUB_CLIENT_SECRET=${oauthConfig.github.clientSecret}\n`;
  }
  
  // Write to file
  try {
    fs.writeFileSync(ENV_FILE, envContent);
    logger.success(`Environment variables written to ${ENV_FILE}`);
    
    // Create .env.example as a reference
    fs.writeFileSync(ENV_EXAMPLE_FILE, envContent
      .replace(nextAuthSecret, 'your-nextauth-secret-here')
      .replace(oauthConfig.google.clientId || '', 'your-google-client-id')
      .replace(oauthConfig.google.clientSecret || '', 'your-google-client-secret')
      .replace(oauthConfig.github.clientId || '', 'your-github-client-id')
      .replace(oauthConfig.github.clientSecret || '', 'your-github-client-secret')
    );
    logger.success(`Example environment created at ${ENV_EXAMPLE_FILE}`);
    
    return true;
  } catch (error) {
    logger.error(`Failed to write environment files: ${error.message}`);
    return false;
  }
}

module.exports = {
  ENV_FILE,
  ENV_EXAMPLE_FILE,
  setupEnvironmentVariables
};
