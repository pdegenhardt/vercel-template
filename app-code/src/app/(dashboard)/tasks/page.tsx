"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  rectIntersection, // Alternative collision detection
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable, // For droppable columns
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus, useTaskStore } from "@/store/task-store";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskForm } from "@/components/tasks/task-form";

// Define the task form values type based on the form schema
interface TaskFormValues {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignee?: string;
}

// Define Column component structure (implementation later)
interface ColumnProps {
  id: TaskStatus;
  label: string;
  color: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

function Column({ id, label, color, tasks, onEditTask, onDeleteTask }: ColumnProps) {
  // Make the entire column a drop target
  const { setNodeRef, isOver, active } = useDroppable({
    id: id, // Use the column ID (todo, in-progress, etc.) as the droppable ID
    data: {
      type: 'column',
      status: id
    }
  });
  
  // Apply visual feedback when a task is dragged over this column
  const isActiveOver = isOver && active;
  
  return (
    <div 
      ref={setNodeRef}
      className={`${color} p-4 rounded-lg border shadow-sm ${isActiveOver ? 'ring-2 ring-primary ring-inset' : ''}`}
>
      <h3 className="font-medium text-sm mb-3">{label} ({tasks.length})</h3>
      <div
        id={`container-${id}`} // Keep this for potential fallback or other uses
        className="min-h-[200px] space-y-2" // Added space-y-2 for better card spacing
      >
        <SortableContext
          id={id} 
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}


export default function TasksPage() {
  const { tasks, addTask, updateTask, deleteTask, moveTask } = useTaskStore();
  
  // Task management state
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Get the active task when dragging
  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;
  
  // Setup sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  // Group tasks by status
  const tasksByStatus = tasks.reduce<Record<TaskStatus, Task[]>>(
    (acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    },
    { todo: [], "in-progress": [], review: [], done: [] }
  );
  
  // Handlers for drag and drop
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };
  
  // handleDragOver can be simplified or removed if not needed for other effects
  // during dragging (like visual feedback). For now, just keeping it minimal.
  const handleDragOver = () => {
    // console.log("Drag Over:", event); // Keep for debugging if needed
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null); // Reset activeId regardless of outcome

    if (!over) {
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string; 

    const activeContainerId = active.data.current?.sortable?.containerId as TaskStatus | undefined;
    const overContainerId = over.data.current?.sortable?.containerId as TaskStatus | undefined;
    
    const validStatuses: TaskStatus[] = ['todo', 'in-progress', 'review', 'done'];
    let targetStatus: TaskStatus | null = null;

    console.log("--- Drag End ---");
    console.log("Active ID:", activeId);
    console.log("Over ID:", overId);
    console.log("Active Container ID:", activeContainerId);
    console.log("Over Container ID (from sortable data):", overContainerId);

    // Determine the target status based on what was dropped over
    // First check if dropped directly onto a column (has higher priority)
    if (validStatuses.includes(overId as TaskStatus)) {
      // Dropped directly onto a column
      targetStatus = overId as TaskStatus;
      console.log("Dropped directly onto column:", targetStatus);
    } else if (over.data.current?.type === 'column') {
      // Dropped onto a droppable column - from useDroppable
      targetStatus = over.data.current.status as TaskStatus;
      console.log("Dropped onto droppable column:", targetStatus);
    } else if (overContainerId && validStatuses.includes(overContainerId)) {
      // Dropped onto a task card within a column
      targetStatus = overContainerId;
      console.log("Dropped onto task within column:", targetStatus);
    } else {
       // Dropped somewhere invalid or unexpected
       console.warn(`Drag ended over invalid target: ${overId}, container: ${overContainerId}`);
       return; // Exit if drop target is not a valid column or task within a column
    }
    
    console.log("Determined Target Status:", targetStatus);

    // Move task only if it's dropped into a *different* valid column
    if (activeContainerId && targetStatus && activeContainerId !== targetStatus) {
      console.log(`Moving task ${activeId} from ${activeContainerId} to ${targetStatus}`);
      moveTask(activeId, targetStatus);
    } else {
      console.log(`Not moving task. Active Container: ${activeContainerId}, Target Status: ${targetStatus}`);
    }
    // Optional: Handle reordering within the same column if needed
    // else if (activeContainerId && targetStatus && activeContainerId === targetStatus && active.id !== over.id) {
    //   console.log(`Reordering task ${activeId} over ${overId} within ${activeContainerId}`);
    //   // Implement reordering logic here if required
    // }
  };
  
  // Add new task
  const handleAddTask = (values: TaskFormValues) => {
    const dueDate = values.dueDate ? new Date(values.dueDate) : undefined;
    
    addTask({
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      dueDate,
      assignee: values.assignee,
    });
    
    setIsAddDialogOpen(false);
  };
  
  // Edit task
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditDialogOpen(true);
  };
  
  // Update task
  const handleUpdateTask = (values: TaskFormValues) => {
    if (!editingTask) return;
    
    const dueDate = values.dueDate ? new Date(values.dueDate) : undefined;
    
    updateTask(editingTask.id, {
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      dueDate,
      assignee: values.assignee,
    });
    
    setIsEditDialogOpen(false);
    setEditingTask(null);
  };
  
  // Status column labels and colors
  const columns = [
    { id: 'todo', label: 'To Do', color: 'bg-blue-50 border-blue-200' },
    { id: 'in-progress', label: 'In Progress', color: 'bg-purple-50 border-purple-200' },
    { id: 'review', label: 'Review', color: 'bg-yellow-50 border-yellow-200' },
    { id: 'done', label: 'Done', color: 'bg-green-50 border-green-200' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage your tasks with this kanban board
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Fill out the form below to create a new task.
              </DialogDescription>
            </DialogHeader>
            <TaskForm onSubmit={handleAddTask} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={rectIntersection} // Using rectIntersection for better area-based detection
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {columns.map((column) => (
            <Column
              key={column.id}
              id={column.id as TaskStatus}
              label={column.label}
              color={column.color}
              tasks={tasksByStatus[column.id as TaskStatus] || []}
              onEditTask={handleEditTask}
              onDeleteTask={deleteTask}
            />
          ))}
          
          {/* Drag overlay */}
          <DragOverlay>
            {activeTask ? (
              <div className="opacity-80">
                <TaskCard 
                  task={activeTask} 
                  onEdit={() => {}} 
                  onDelete={() => {}} 
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
      
      {/* Edit task dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>
              Update the task details below.
            </DialogDescription>
          </DialogHeader>
          {editingTask && (
            <TaskForm task={editingTask} onSubmit={handleUpdateTask} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
