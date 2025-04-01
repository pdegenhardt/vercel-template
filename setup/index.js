#!/usr/bin/env node

/**
 * Admin Dashboard Template - Setup Script
 * 
 * This script guides the setup and configuration of NextAuth
 * and other necessary components for the admin dashboard.
 */

const { logger, divider, header } = require('./logger');
const { checkProjectStructure } = require('./project');
const { generateNextAuthSecret } = require('./auth-utils');
const { installDependencies } = require('./dependencies');
const { setupGoogleOAuth } = require('./google-oauth');
const { setupGitHubOAuth } = require('./github-oauth');
const { updateAuthConfig } = require('./auth-config');
const { setupEnvironmentVariables } = require('./environment');
const { closeReadline } = require('./utils');

// OAuth configuration that will be populated during setup
const OAUTH_CONFIG = {
  google: {
    clientId: null,
    clientSecret: null,
    redirectUri: 'http://localhost:3000/api/auth/callback/google'
  },
  github: {
    clientId: null,
    clientSecret: null,
    redirectUri: 'http://localhost:3000/api/auth/callback/github'
  }
};

// Main function to run setup
async function runSetup() {
  header('Admin Dashboard Setup');
  logger.info('This script will set up and configure your Admin Dashboard application.');
  divider();
  
  try {
    // Check project structure
    checkProjectStructure();
    
    // Generate NextAuth secret
    const nextAuthSecret = generateNextAuthSecret();
    
    // Install dependencies
    await installDependencies();
    
    // Set up OAuth providers with guided process
    await setupGoogleOAuth(OAUTH_CONFIG);
    await setupGitHubOAuth(OAUTH_CONFIG);
    
    // Update configuration files
    await updateAuthConfig(OAUTH_CONFIG);
    
    // Set up environment variables
    await setupEnvironmentVariables(nextAuthSecret, OAUTH_CONFIG);
    
    divider();
    logger.success('Setup completed successfully!');
    logger.info('You can now start your application with:');
    console.log('\n  cd app-code && npm run dev\n');
    
    // Clean up before exit
    closeReadline();
    process.exit(0);
  } catch (error) {
    logger.error(`Setup failed: ${error.message}`);
    // Clean up even when there's an error
    closeReadline();
    process.exit(1);
  }
}

// Run the setup
runSetup();
