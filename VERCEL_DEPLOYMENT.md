# Vercel Deployment Setup

This project is configured to automatically deploy to Vercel whenever changes are pushed to the main branch. This document explains how to set up the deployment process.

## Prerequisites

- A GitHub account (with this repository)
- A Vercel account (you can create one for free at [vercel.com](https://vercel.com))

## Setup Steps

### 1. Create a Vercel Account

1. Go to [vercel.com](https://vercel.com) and sign up for a new account
2. You can sign up using your GitHub account for seamless integration
3. Complete the onboarding process

### 2. Import Your GitHub Repository

1. From the Vercel dashboard, click "Add New..." → "Project"
2. Connect to GitHub if prompted
3. Find and select your repository
4. Configure project settings:
   - Framework Preset: Next.js (should be auto-detected)
   - Root Directory: `app-code` (since your Next.js code is in this subdirectory)
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
5. Add environment variables from your `.env.local` file
6. Click "Deploy" to start the initial deployment

### 3. Get Vercel Deployment Tokens

To enable GitHub Actions to deploy to Vercel, you need to obtain three tokens:

1. **Vercel Token**:
   - Go to your Vercel account settings (click on your avatar → Settings)
   - Navigate to "Tokens" tab
   - Create a new token with a descriptive name (e.g., "GitHub Actions")
   - Copy the token value

2. **Vercel Organization ID and Project ID**:
   - Go to your Vercel project
   - Click on "Settings" → "General"
   - Scroll down to find your "Project ID" and copy it
   - For the Organization ID, go to your Vercel dashboard
   - Click on your profile picture → "Settings" → "General"
   - Copy your "ID" under the "Your ID" section

### 4. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `VERCEL_TOKEN`: Your Vercel token
   - `VERCEL_ORG_ID`: Your Vercel organization ID
   - `VERCEL_PROJECT_ID`: Your Vercel project ID

### 5. Test the Deployment

1. Make a change to your repository
2. Commit and push the change to your main branch
3. Go to the "Actions" tab in your GitHub repository to monitor the workflow
4. Once the workflow completes, check your Vercel dashboard to see the new deployment

## Custom Domain Setup (Optional)

When you're ready to set up a custom domain:

1. Purchase a domain from a domain registrar
2. In your Vercel project, go to "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS settings at your domain registrar
5. Vercel will automatically provision an SSL certificate

## Troubleshooting

- If deployments fail, check the GitHub Actions logs for error messages
- Ensure all required environment variables are set in Vercel
- Verify that the Vercel tokens and IDs are correct
- Check that the root directory is correctly set to `app-code`
