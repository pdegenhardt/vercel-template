# Admin Dashboard Template with Memory Bank

A comprehensive project featuring a modern admin dashboard implementation alongside a structured documentation system. This repository contains both the application code and a memory bank documentation system that enables effective knowledge transfer and development.

## Project Overview

This project consists of two main components:

1. **Admin Dashboard Template** (`app-code/`): A scalable and maintainable admin dashboard built with Next.js 15, TypeScript, shadcn/ui components, and NextAuth.js for authentication.

2. **Memory Bank Documentation** (`memory-bank/`): A structured documentation system that captures project knowledge, design decisions, technical context, and development progress.

## Repository Structure

```
vercel-template/
├── app-code/             # Application implementation
│   ├── src/              # Source code
│   │   ├── app/          # Next.js App Router pages and layouts
│   │   ├── components/   # Reusable UI components
│   │   ├── lib/          # Utilities, services, and configurations
│   │   ├── store/        # State management
│   │   └── ...
│   └── ...
│
└── memory-bank/          # Project documentation system
    ├── projectbrief.md   # Core project requirements and goals
    ├── productContext.md # Purpose and user experience goals
    ├── systemPatterns.md # Architecture and design patterns
    ├── techContext.md    # Technologies and implementations
    ├── activeContext.md  # Current focus and recent decisions
    ├── progress.md       # Implementation progress tracking
    └── .clinerules       # Project-specific patterns and rules
```

## Application Features

The Admin Dashboard Template includes:

### Authentication
- Multiple authentication methods (Email/password, OAuth)
- Protected routes with NextAuth.js middleware
- Comprehensive session handling

### Dashboard
- Analytics overview with key metrics
- Interactive data visualization using Recharts
- Responsive design for all device sizes

### Data Management
- Advanced data tables with searching, filtering, and pagination
- Complete CRUD operations for data entities
- Form validation using React Hook Form and Zod

### User Profile
- Profile management with editable fields
- Multi-step dynamic forms
- Theme preferences

### Task Management
- Kanban board with drag-and-drop functionality (dnd-kit)
- Status-based columns for task organization
- Local storage persistence

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form with Zod validation
- **State Management**: Zustand
- **Data Tables**: TanStack Table
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Drag and Drop**: dnd-kit

## Memory Bank System

The Memory Bank is a structured documentation system designed to maintain perfect documentation between development sessions. It consists of required core files that capture different aspects of the project:

### Core Files

1. **`projectbrief.md`**
   - Foundation document that shapes all other files
   - Defines core requirements and goals
   - Source of truth for project scope

2. **`productContext.md`**
   - Why this project exists
   - Problems it solves
   - How it should work
   - User experience goals

3. **`systemPatterns.md`**
   - System architecture
   - Key technical decisions
   - Design patterns in use
   - Component relationships

4. **`techContext.md`**
   - Technologies used
   - Development setup
   - Technical constraints
   - Dependencies

5. **`activeContext.md`**
   - Current work focus
   - Recent changes
   - Next steps
   - Active decisions and considerations

6. **`progress.md`**
   - What works
   - What's left to build
   - Current status
   - Known issues

7. **`.clinerules`**
   - Project-specific patterns
   - Learning journal for the project
   - Evolution of project decisions

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository into a new directory with your app name:
   ```bash
   git clone https://github.com/pdegenhardt/vercel-template.git your-app-name
   cd your-app-name
   ```
   
   Replace `your-app-name` with the actual name you want for your application.

2. Run the setup script:
   ```bash
   # Make the script executable if needed
   chmod +x setup.js
   
   # Run the setup script
   ./setup.js
   ```
   
   This automated setup script will:
   - Install dependencies
   - Generate a secure NextAuth secret
   - Configure OAuth providers (Google and GitHub) if desired
   - Set up environment variables
   - Update authentication configuration

3. Run the development server:
   ```bash
   cd app-code
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Workflow

### Using the Memory Bank

The Memory Bank system is designed to maintain perfect documentation between development sessions. When starting work on the project:

1. **Review the Memory Bank**: Read through the core files to understand the current state of the project
   - Start with `activeContext.md` and `progress.md` for the most recent updates
   - Reference `projectbrief.md`, `productContext.md`, `systemPatterns.md`, and `techContext.md` as needed

2. **Update Documentation**: After implementing significant changes:
   - Update `activeContext.md` with current focus and recent decisions
   - Update `progress.md` with implementation status
   - Revise other documents as architecture or technology choices evolve

3. **Maintain .clinerules**: Document project-specific patterns and insights in `.clinerules` to capture valuable project intelligence

### Documentation First Approach

This project follows a documentation-first approach where:

1. Changes to requirements should be documented in `projectbrief.md`
2. Architecture decisions should be captured in `systemPatterns.md`
3. Implementation details should be reflected in `techContext.md`
4. Current status should always be updated in `progress.md`

## Implementation Status

The project is currently in the **final implementation phase** with an overall completion of approximately 95%. All major features have been implemented and are working as expected, with only minor refinements needed.

## License

[MIT](https://choosealicense.com/licenses/mit/)
