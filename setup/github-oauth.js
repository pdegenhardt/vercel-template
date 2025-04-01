/**
 * GitHub OAuth setup module
 * 
 * This module provides a guided manual process for setting up GitHub OAuth
 * instead of attempting to automate the flow.
 */

const { logger, header } = require('./logger');
const { promptYesNo, prompt } = require('./utils');

// GitHub OAuth setup with manual guidance
async function setupGitHubOAuth(oauthConfig) {
  header('Setting up GitHub OAuth');
  logger.info('This process will guide you through setting up GitHub OAuth authentication.');
  
  const useGithub = await promptYesNo('Do you want to set up GitHub OAuth authentication?');
  if (!useGithub) {
    logger.info('Skipping GitHub OAuth setup.');
    return false;
  }

  // Step 1: Create a GitHub OAuth App
  logger.step('Step 1: Create a GitHub OAuth Application');
  logger.info('Please follow these steps to create a GitHub OAuth Application:');
  logger.info('');
  logger.info('1. Go to https://github.com/settings/developers');
  logger.info('2. Click on "OAuth Apps" in the left sidebar');
  logger.info('3. Click on "New OAuth App" button');
  logger.info('4. Fill in the registration form:');
  logger.info('   - Application name: "Admin Dashboard"');
  logger.info('   - Homepage URL: http://localhost:3000');
  logger.info('   - Application description: (Optional) "Admin Dashboard Template Application"');
  logger.info('   - Authorization callback URL: http://localhost:3000/api/auth/callback/github');
  logger.info('5. Click "Register application"');
  logger.info('6. On the next page, note your Client ID');
  logger.info('7. Click "Generate a new client secret"');
  logger.info('');
  logger.info('⚠️ IMPORTANT: Copy both the client ID and the newly generated client secret ⚠️');
  logger.info('');
  
  await prompt('Press Enter once you\'ve created your GitHub OAuth Application...');
  
  // Get the client ID and secret from user
  oauthConfig.github.clientId = await prompt('Enter your GitHub OAuth Client ID:');
  oauthConfig.github.clientSecret = await prompt('Enter your GitHub OAuth Client Secret:');
  
  if (!oauthConfig.github.clientId || !oauthConfig.github.clientSecret) {
    logger.error('Client ID and Secret are required to continue.');
    return false;
  }
  
  logger.success('GitHub OAuth credentials saved successfully!');
  return true;
}

module.exports = {
  setupGitHubOAuth
};
