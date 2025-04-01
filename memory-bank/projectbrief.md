# Project Brief: Admin Dashboard Template with NextAuth.js Integration

## Objective

Develop a scalable and maintainable admin dashboard template using Next.js 15, TypeScript, shadcn/ui components, React Hook Form with Zod validation, and Tailwind CSS for styling. The application will incorporate NextAuth.js for robust authentication, supporting various providers including email/password and OAuth.

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Form Management**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Authentication**: NextAuth.js
- **Data Fetching**: TanStack Query (formerly React Query)

## Features and Pages

### Authentication
- **Sign-Up and Sign-In Pages**: Implement user authentication using NextAuth.js, supporting various providers including email/password and OAuth.

### Dashboard
- **Overview Page**: Display key metrics and analytics using responsive cards and charts. Utilize Recharts for data visualization.

### Data Management
- **Data Table Page**: Implement a table with server-side searching, filtering, pagination, and sorting using TanStack Table and Nuqs for managing search parameters.
- **Data Entry Form**: Create forms for adding and editing data entries, utilizing React Hook Form integrated with shadcn/ui components and Zod for schema validation.

### User Profile
- **Profile Page**: Develop a user profile page with editable fields, implementing multi-step dynamic forms using React Hook Form and Zod for validation.

### Task Management
- **Kanban Board**: Implement a drag-and-drop task management board using dnd-kit and Zustand for state management, with local state persistence.

### Error Handling
- **Not Found Page**: Design a custom 404 page to handle undefined routes.

## Component Integration

- **Navigation**: Develop a responsive sidebar and top navigation bar using shadcn/ui components.
- **Forms**: Utilize shadcn/ui form components in conjunction with React Hook Form and Zod for robust form handling and validation.
- **Tables**: Implement dynamic and responsive tables using TanStack Table, integrated with shadcn/ui for consistent styling.
- **Charts**: Incorporate Recharts for interactive data visualization within the dashboard.

## Styling

- **Tailwind CSS**: Apply utility-first styling with Tailwind CSS to ensure a responsive and cohesive design.
- **Theme Support**: Implement dark and light themes using the next-themes package for enhanced user experience.

## Authentication Implementation with NextAuth.js

- **Configuration**: Set up NextAuth.js by creating an auth.ts file at the project's root to define authentication configurations, including providers and callbacks.
- **Middleware Protection**: Utilize Next.js Middleware to protect routes, ensuring that only authenticated users can access certain pages. This involves creating a middleware.ts file that integrates with NextAuth.js.
- **Session Management**: Use the useSession hook from NextAuth.js to manage user sessions within components, allowing for dynamic UI changes based on authentication status.

## Additional Tools

- **ESLint and Prettier**: Ensure code quality and consistency through linting and formatting.
- **Husky**: Manage pre-commit hooks to maintain code integrity.

## Deployment

- **Vercel**: Deploy the application using Vercel for seamless integration with Next.js and cost-effective hosting solutions.

## Implementation Notes

This project will serve as a foundational template for admin applications, providing a structured and scalable architecture. It will facilitate rapid development and customization for various administrative interfaces, ensuring a consistent and efficient user experience.
