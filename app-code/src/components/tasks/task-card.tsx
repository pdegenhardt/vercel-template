"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Task } from "@/store/task-store";
import { useState } from "react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColor = {
    low: 'bg-primary/10 text-primary',
    medium: 'bg-secondary/20 text-secondary-foreground',
    high: 'bg-destructive/10 text-destructive',
  }[task.priority];

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="mb-2 cursor-grab active:cursor-grabbing border-primary/10 hover:border-primary/30 transition-colors"
      {...attributes}
      {...listeners}
    >
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-start">
          <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColor}`}>
            {task.priority}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2 text-xs text-muted-foreground">
        {task.description}
        
        {task.dueDate && (
          <div className="mt-2 text-xs">
            <span className="font-semibold">Due:</span> {formatDate(task.dueDate)}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between">
        <Button size="sm" variant="outline" onClick={() => onEdit(task)}>
          Edit
        </Button>
        
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this task? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete(task.id);
                  setIsDeleteDialogOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
