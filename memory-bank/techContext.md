# Technical Context

This document provides a comprehensive overview of the technologies, tools, and configurations used in the Admin Dashboard template project. It reflects the current implementation details and serves as a technical reference.

## Core Technologies

### Next.js 15

The project has been implemented using Next.js 15, with the following features:

- **App Router**: Used for file-based routing with route groups `(auth)` and `(dashboard)` for logical organization
- **Client Components**: All components are marked with "use client" due to their interactive nature
- **Middleware**: Implemented in `middleware.ts` for route protection based on authentication status
- **API Routes**: Created handlers for authentication via NextAuth.js

Configuration is managed through `next.config.ts`:
```typescript
// Basic configuration for TypeScript-based Next.js project
const config = {}; 
export default config;
```

### TypeScript

The project fully implements TypeScript with:

- **Type Definitions**: Custom types for data models (`Task`, `DataItem`) and component props
- **Interfaces**: Defined for component props, API responses, and data models
- **Type Safety**: Generics used in components like `DataTable<T>` for type-safe implementations
- **Type Inference**: Leveraging `z.infer<typeof schema>` with Zod for form types

### Tailwind CSS

Styling has been implemented using Tailwind CSS throughout the application:

- **Utility Classes**: Extensively used for component styling
- **Dark Mode**: Support for light/dark themes via `next-themes`
- **Responsive Design**: Mobile-first approach with responsive components
- **Custom Classes**: Extended utility classes for specific styling needs

### shadcn/ui Components

The UI is built on shadcn/ui components:

- **Core Components**: Button, Card, Dialog, Form, Input, Select, Tabs, etc.
- **Component Registry**: Components stored in `components/ui` directory
- **Customization**: Components adapted to project needs
- **Composition**: Building complex UI by composing multiple shadcn/ui components

## Setup Utilities

### Modular Setup Architecture

The project includes a comprehensive setup system implemented with Node.js:

- **Entry Point**: `setup.js` serves as the main entry point that requires and executes the modular implementation
- **Module Structure**: Functionality is divided into specialized modules in the `setup/` directory
- **Error Handling**: Robust error handling with informative messages and proper cleanup

The setup system includes the following key modules:

- **logger.js**: Custom logging utilities with colored output for different message types (info, success, error)
- **project.js**: Validates the project structure to ensure all required directories and files exist
- **auth-utils.js**: Provides utilities for generating secure NextAuth secrets and other authentication helpers
- **dependencies.js**: Manages the installation of required npm packages
- **environment.js**: Handles the creation and configuration of environment variables
- **auth-config.js**: Updates the NextAuth configuration with provider settings
- **github-oauth.js** and **google-oauth.js**: Specialized modules for configuring specific OAuth providers
- **utils.js**: General utility functions used across the setup process

### Setup Process Flow

The setup process follows a sequential flow:

1. Check project structure to ensure all required directories exist
2. Generate a secure NextAuth secret for JWT encryption
3. Install or update required dependencies
4. Guide the user through Google OAuth configuration
5. Guide the user through GitHub OAuth configuration
6. Update the auth configuration files with the provided credentials
7. Set up environment variables with the collected configuration
8. Complete the setup with success message and next steps

## Authentication

### NextAuth.js

Authentication has been implemented with NextAuth.js:

- **Configuration**: Created in `lib/auth.ts` with:
  - **Providers**: Credentials, GitHub, and Google OAuth providers
  - **Callbacks**: JWT and session management for authentication state
  - **Pages**: Custom sign-in, sign-up pages in the `(auth)` route group
- **Middleware**: Route protection through `middleware.ts`
- **Session Management**: `useSession` hook for client-side access
- **Mock Data**: Sample user for demonstration purposes
- **Automated Setup**: Dedicated setup scripts to streamline OAuth configuration

Example from auth.ts:
```typescript
export const authConfig: AuthOptions = {
  providers: [
    CredentialsProvider({
      // Credential authentication logic
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "github-client-id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "github-client-secret",
    }),
    // Additional providers...
  ],
  // Session, callbacks, etc.
};
```

### OAuth Configuration

The setup process includes guided configuration for OAuth providers:

- **Google OAuth**: Interactive setup for Google Cloud Console credentials
  - Client ID and secret collection
  - Redirect URI configuration
  - Scopes configuration for profile and email access

- **GitHub OAuth**: Interactive setup for GitHub OAuth Apps
  - Client ID and secret collection
  - Callback URL configuration
  - Permission scopes setup

## Form Management

### React Hook Form

Forms have been implemented with React Hook Form:

- **Authentication Forms**: Sign-in and sign-up forms
- **Data Forms**: Forms for creating and editing data entries
- **Task Forms**: Task creation and editing with validation
- **Profile Forms**: User profile management forms

Example implementation:
```typescript
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema),
  defaultValues: {
    // Default values
  },
});
```

### Zod

Schema validation is implemented with Zod:

- **Authentication Schemas**: Validation for login and signup forms
- **Data Schemas**: Schemas for data table entries in `lib/validations/data.ts`
- **Task Schemas**: Validation for task creation/editing
- **Error Messages**: Custom error messages for validation failures

## State Management

### Zustand

Global state management has been implemented with Zustand:

- **Task Management**: States and actions for the Kanban board in `store/task-store.ts`
- **Persistence**: Local storage persistence for tasks
- **Type Safety**: Fully typed store implementation

Example from task-store.ts:
```typescript
export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [...],
      addTask: (task) => set((state) => ({
        tasks: [...state.tasks, { ...task, id: uuidv4(), createdAt: new Date() }],
      })),
      // Other actions...
    }),
    { name: 'admin-dashboard-tasks' }
  )
);
```

### Local React State

React's built-in state management is used for component-specific state:

- **Dialog States**: Managing the open/closed state of dialogs
- **Loading States**: Tracking loading status during async operations
- **Form States**: Managing form submission state
- **UI States**: Toggle states for UI elements

## Data Management

### Mock Data Services

Data is currently managed through mock services:

- **Data Service**: `lib/data-service.ts` implements CRUD operations
- **Simulated Latency**: Added artificial delays to simulate network requests
- **Error Handling**: Try/catch patterns for error management
- **Pagination**: Server-side pagination implementation

### Data Tables

Data tables have been implemented with:

- **Custom Component**: Generic `DataTable` component in `components/data-table/data-table.tsx`
- **Searching**: Search functionality for filtering data
- **Filtering**: Filter dropdowns for status and role
- **Pagination**: Page navigation with item count display
- **CRUD Integration**: Edit and delete actions with confirmation dialogs

## Visualization

### Recharts

Data visualization has been implemented with Recharts:

- **Line Chart**: Revenue over time visualization
- **Bar Chart**: Sales by product comparison
- **Responsive Containers**: Auto-resizing charts
- **Styling**: Consistent styling with application theme
- **Sample Data**: Mock data for demonstration purposes

## Task Management

### dnd-kit

Drag-and-drop functionality has been implemented with dnd-kit:

- **Kanban Board**: Task management with draggable cards
- **Column Layout**: Status-based columns (Todo, In Progress, Review, Done)
- **Drag Sensors**: Support for mouse, touch interactions
- **Visual Feedback**: Opacity changes during drag operations
- **State Updates**: Task status updates on drop

## Development Environment

### Dependencies

Key dependencies installed and used:

- **Authentication**: next-auth
- **UI Components**: shadcn/ui components
- **State Management**: zustand
- **Form Management**: react-hook-form, @hookform/resolvers, zod
- **Data Tables**: @tanstack/react-table
- **Data Fetching**: @tanstack/react-query
- **Styling**: tailwindcss, next-themes
- **Drag and Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Visualization**: recharts
- **Utilities**: uuid, crypto (for NextAuth secret generation)
- **Setup Utilities**: readline (for interactive prompts), chalk (for colored console output)
- **Deployment**: GitHub Actions, Vercel deployment integration

### Environment Variables

The project uses environment variables for configuration, which are set up during the setup process:

- **NEXTAUTH_SECRET**: Securely generated random string for JWT encryption
- **NEXTAUTH_URL**: The base URL for NextAuth callbacks (defaults to http://localhost:3000)
- **GITHUB_CLIENT_ID**: GitHub OAuth application client ID
- **GITHUB_CLIENT_SECRET**: GitHub OAuth application client secret
- **GOOGLE_CLIENT_ID**: Google OAuth client ID
- **GOOGLE_CLIENT_SECRET**: Google OAuth client secret

These variables are stored in a `.env.local` file in the app-code directory and loaded by Next.js at runtime.

## Deployment Configuration

### GitHub Actions Workflow

The project includes a GitHub Actions workflow for continuous deployment to Vercel:

```yaml
name: Deploy to Vercel

on:
  push:
    branches:
      - main  # or your default branch name

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 'app-code/package-lock.json'
          
      - name: Install dependencies
        run: |
          cd app-code
          npm ci
          
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./app-code
          vercel-args: '--prod'
```

### Vercel Configuration

The deployment to Vercel requires the following configuration:

1. **GitHub Repository Integration**: The repository is connected to Vercel for deployment
2. **Project Configuration**:
   - Framework Preset: Next.js
   - Root Directory: `app-code`
   - Build Command: `next build` (default)
   - Output Directory: `.next` (default)
3. **Environment Variables**: All variables from `.env.local` need to be added to the Vercel project
4. **GitHub Secrets**:
   - `VERCEL_TOKEN`: API token for Vercel authentication
   - `VERCEL_ORG_ID`: Organization ID from Vercel
   - `VERCEL_PROJECT_ID`: Project ID from Vercel

### Deployment Documentation

Comprehensive deployment documentation is provided in `VERCEL_DEPLOYMENT.md`, which includes:

1. Step-by-step instructions for setting up a Vercel account
2. Guidance on importing the GitHub repository to Vercel
3. Instructions for obtaining the necessary Vercel tokens and IDs
4. Steps to add the required secrets to the GitHub repository
5. Information on custom domain setup (optional)
6. Troubleshooting guidance for common deployment issues
