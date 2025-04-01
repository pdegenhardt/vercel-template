/**
 * Google OAuth setup module
 * 
 * This module provides a guided manual process for setting up Google OAuth
 * instead of attempting to automate the flow.
 */

const { logger, header } = require('./logger');
const { promptYesNo, prompt } = require('./utils');

// Google OAuth setup with manual guidance
async function setupGoogleOAuth(oauthConfig) {
  header('Setting up Google OAuth');
  logger.info('This process will guide you through setting up Google OAuth authentication.');
  
  const useGoogle = await promptYesNo('Do you want to set up Google OAuth authentication?');
  if (!useGoogle) {
    logger.info('Skipping Google OAuth setup.');
    return false;
  }

  // Step 1: Create Google Cloud Project
  logger.step('Step 1: Create a Google Cloud Project');
  logger.info('Please follow these steps to create a Google Cloud Project:');
  logger.info('');
  logger.info('1. Go to https://console.cloud.google.com/');
  logger.info('2. Sign in with your Google account if you\'re not already signed in');
  logger.info('3. Click on "Select a project" in the top menu bar');
  logger.info('4. Click on "NEW PROJECT" in the modal window');
  logger.info('5. Enter a project name (e.g., "Admin Dashboard")');
  logger.info('6. Click "CREATE"');
  logger.info('7. Wait for the project to be created and select it');
  logger.info('');
  
  await prompt('Press Enter once you\'ve created your Google Cloud Project...');

  // Step 2: Configure OAuth consent screen
  logger.step('Step 2: Configure OAuth Consent Screen');
  logger.info('Now you need to configure the OAuth consent screen:');
  logger.info('');
  logger.info('1. Go to https://console.cloud.google.com/apis/credentials/consent');
  
  // Branched instructions for different account types
  logger.info('2. You will see two options for User Type:');
  logger.info('   - "External": For regular Gmail accounts (most users)');
  logger.info('   - "Internal": Only available for Google Workspace users');
  logger.info('');
  logger.info('3. For Google Workspace users:');
  logger.info('   a. Select "Internal" and click "CREATE"');
  logger.info('   b. Fill in the required fields:');
  logger.info('      - App name: "Admin Dashboard"');
  logger.info('      - User support email: Enter your email');
  logger.info('      - Developer contact information: Enter your email');
  logger.info('   c. Click "SAVE AND CONTINUE"');
  logger.info('   d. On the Scopes screen, click "SAVE AND CONTINUE"');
  logger.info('   e. On the Test Users screen, click "SAVE AND CONTINUE" (not needed for Internal)');
  logger.info('');
  logger.info('4. For regular Gmail accounts:');
  logger.info('   a. Select "External" and click "CREATE"');
  logger.info('   b. Fill in the required fields:');
  logger.info('      - App name: "Admin Dashboard"');
  logger.info('      - User support email: Enter your email');
  logger.info('      - Developer contact information: Enter your email');
  logger.info('      - Application homepage link: http://localhost:3000');
  logger.info('      - Application privacy policy link: http://localhost:3000/privacy (can use this temporarily)');
  logger.info('      - Application terms of service link: http://localhost:3000/terms (can use this temporarily)');
  logger.info('   c. Click "SAVE AND CONTINUE"');
  logger.info('   d. On the Scopes screen, click "ADD OR REMOVE SCOPES"');
  logger.info('   e. Select the following scopes:');
  logger.info('      - .../auth/userinfo.email');
  logger.info('      - .../auth/userinfo.profile');
  logger.info('      - openid');
  logger.info('   f. Click "UPDATE" and then "SAVE AND CONTINUE"');
  logger.info('   g. On the Test Users screen, click "ADD USERS"');
  logger.info('   h. Enter your own email address and click "ADD"');
  logger.info('   i. Click "SAVE AND CONTINUE"');
  logger.info('');
  logger.info('5. Click "BACK TO DASHBOARD"');
  logger.info('');
  
  await prompt('Press Enter once you\'ve configured the OAuth consent screen...');

  // Step 3: Create OAuth Client ID
  logger.step('Step 3: Create OAuth Client ID');
  logger.info('Now you need to create OAuth credentials:');
  logger.info('');
  logger.info('1. Go to https://console.cloud.google.com/apis/credentials');
  logger.info('2. Click "CREATE CREDENTIALS" and select "OAuth client ID"');
  logger.info('3. Select "Web application" as the Application type');
  logger.info('4. Name: "Admin Dashboard Web Client"');
  logger.info('5. Add an Authorized JavaScript origin: http://localhost:3000');
  logger.info('6. Add an Authorized redirect URI: http://localhost:3000/api/auth/callback/google');
  logger.info('7. Click "CREATE"');
  logger.info('8. A modal will display your client ID and client secret');
  logger.info('');
  logger.info('⚠️ IMPORTANT: Copy both the client ID and client secret ⚠️');
  logger.info('');
  
  // Get the client ID and secret from user
  oauthConfig.google.clientId = await prompt('Enter your Google OAuth Client ID:');
  oauthConfig.google.clientSecret = await prompt('Enter your Google OAuth Client Secret:');
  
  if (!oauthConfig.google.clientId || !oauthConfig.google.clientSecret) {
    logger.error('Client ID and Secret are required to continue.');
    return false;
  }
  
  logger.success('Google OAuth credentials saved successfully!');
  return true;
}

module.exports = {
  setupGoogleOAuth
};
