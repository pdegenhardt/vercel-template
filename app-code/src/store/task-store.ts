import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

// Define types for our task management
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
  assignee?: string;
}

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
}

// Create the store with persistence
export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [
        // Some initial sample tasks
        {
          id: uuidv4(),
          title: 'Implement authentication',
          description: 'Set up NextAuth.js for user authentication',
          status: 'done',
          priority: 'high',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuidv4(),
          title: 'Create dashboard layout',
          description: 'Design and implement responsive dashboard layout',
          status: 'done',
          priority: 'high',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuidv4(),
          title: 'Build data tables',
          description: 'Implement data tables with sorting, filtering, and pagination',
          status: 'in-progress',
          priority: 'medium',
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuidv4(),
          title: 'Add user profile management',
          description: 'Create user profile page with editing capabilities',
          status: 'todo',
          priority: 'medium',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuidv4(),
          title: 'Implement Kanban board',
          description: 'Create task management with drag-and-drop functionality',
          status: 'review',
          priority: 'high',
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        },
        {
          id: uuidv4(),
          title: 'Add charts and analytics',
          description: 'Implement data visualization with Recharts',
          status: 'todo',
          priority: 'low',
          createdAt: new Date(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      ],
      
      addTask: (task) => set((state) => ({
        tasks: [
          ...state.tasks,
          {
            ...task,
            id: uuidv4(),
            createdAt: new Date(),
          },
        ],
      })),
      
      updateTask: (id, updates) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        ),
      })),
      
      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),
      
      moveTask: (id, status) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, status } : task
        ),
      })),
    }),
    {
      name: 'admin-dashboard-tasks',
    }
  )
);
