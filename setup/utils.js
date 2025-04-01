/**
 * Utility functions for the setup process
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const crypto = require('crypto');
const readline = require('readline');

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper to generate a secure random string
function generateRandomString(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Helper to make HTTP requests
function makeRequest(url, options = {}, data = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const isHttps = parsedUrl.protocol === 'https:';
    const requestOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (isHttps ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const client = isHttps ? https : http;
    const req = client.request(requestOptions, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const contentType = res.headers['content-type'] || '';
            if (contentType.includes('application/json')) {
              resolve(JSON.parse(responseData));
            } else {
              resolve(responseData);
            }
          } catch (error) {
            resolve(responseData);
          }
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    
    req.end();
  });
}

// Start temporary local server to receive OAuth callbacks
function startLocalServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      if (req.url.startsWith('/oauth/callback')) {
        const url = new URL(`http://localhost${req.url}`);
        const code = url.searchParams.get('code');
        const state = url.searchParams.get('state');
        
        if (code) {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Authentication Successful</title>
                <style>
                  body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                  .success { color: #4CAF50; }
                  .container { max-width: 600px; margin: 0 auto; }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1 class="success">Authentication Successful!</h1>
                  <p>You have successfully authenticated. You can now close this window and return to the setup process.</p>
                </div>
              </body>
            </html>
          `);
          
          server.emit('authCode', code, state);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html' });
          res.end(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Authentication Failed</title>
                <style>
                  body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                  .error { color: #F44336; }
                  .container { max-width: 600px; margin: 0 auto; }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1 class="error">Authentication Failed</h1>
                  <p>No authorization code was received. Please try again.</p>
                </div>
              </body>
            </html>
          `);
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    
    server.listen(0, () => {
      resolve(server);
    });
    
    server.on('error', (err) => {
      reject(err);
    });
  });
}

// Prompt helpers
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(`${question} `, (answer) => {
      resolve(answer.trim());
    });
  });
}

function promptYesNo(question) {
  return new Promise((resolve) => {
    rl.question(`${question} (y/n) `, (answer) => {
      resolve(answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === 'yes');
    });
  });
}

function promptNumber(question, min, max) {
  return new Promise((resolve) => {
    rl.question(`${question} `, (answer) => {
      const num = parseInt(answer.trim(), 10);
      if (isNaN(num) || num < min || num > max) {
        console.log(`Please enter a number between ${min} and ${max}`);
        resolve(promptNumber(question, min, max));
      } else {
        resolve(num);
      }
    });
  });
}

// Clean up readline interface
function closeReadline() {
  rl.close();
}

module.exports = {
  generateRandomString,
  makeRequest,
  startLocalServer,
  prompt,
  promptYesNo,
  promptNumber,
  closeReadline,
  rl
};
