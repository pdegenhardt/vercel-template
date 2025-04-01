/**
 * NextAuth configuration file handler
 */

const fs = require('fs');
const { logger } = require('./logger');
const { AUTH_FILE } = require('./project');

// Update auth configuration file
async function updateAuthConfig(oauthConfig) {
  logger.step('Updating NextAuth configuration');
  
  try {
    // Read current auth.ts file
    const currentAuthConfig = fs.readFileSync(AUTH_FILE, 'utf8');
    
    // Create updated content with actual client IDs and secrets
    let updatedAuthConfig = currentAuthConfig;
    
    if (oauthConfig.google.clientId && oauthConfig.google.clientSecret) {
      updatedAuthConfig = updatedAuthConfig.replace(
        /clientId: process\.env\.GOOGLE_CLIENT_ID \|\| ".*?"/,
        `clientId: process.env.GOOGLE_CLIENT_ID || "${oauthConfig.google.clientId}"`
      );
      
      updatedAuthConfig = updatedAuthConfig.replace(
        /clientSecret: process\.env\.GOOGLE_CLIENT_SECRET \|\| ".*?"/,
        `clientSecret: process.env.GOOGLE_CLIENT_SECRET || "${oauthConfig.google.clientSecret}"`
      );
    }
    
    if (oauthConfig.github.clientId && oauthConfig.github.clientSecret) {
      updatedAuthConfig = updatedAuthConfig.replace(
        /clientId: process\.env\.GITHUB_CLIENT_ID \|\| ".*?"/,
        `clientId: process.env.GITHUB_CLIENT_ID || "${oauthConfig.github.clientId}"`
      );
      
      updatedAuthConfig = updatedAuthConfig.replace(
        /clientSecret: process\.env\.GITHUB_CLIENT_SECRET \|\| ".*?"/,
        `clientSecret: process.env.GITHUB_CLIENT_SECRET || "${oauthConfig.github.clientSecret}"`
      );
    }
    
    // Write updated content back to auth.ts
    fs.writeFileSync(AUTH_FILE, updatedAuthConfig);
    logger.success('NextAuth configuration updated successfully');
    
    return true;
  } catch (error) {
    logger.error(`Failed to update NextAuth configuration: ${error.message}`);
    return false;
  }
}

module.exports = {
  updateAuthConfig
};
