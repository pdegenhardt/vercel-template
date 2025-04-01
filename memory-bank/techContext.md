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
- **Utilities**: uuid
