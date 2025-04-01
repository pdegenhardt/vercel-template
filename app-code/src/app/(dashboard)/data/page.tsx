"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { DataItem, createDataItemSchema, updateDataItemSchema } from "@/lib/validations/data";
import { dataService } from "@/lib/data-service";
import type { ColumnDef } from "@/components/data-table/data-table";

export default function DataPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DataItem[]>([]);
  const [meta, setMeta] = useState({
    page: 1,
    pageSize: 5,
    totalItems: 0,
    totalPages: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // Default to 'all'
  const [roleFilter, setRoleFilter] = useState("all"); // Default to 'all'

  // Dialog state for CRUD operations
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);

  // Forms
  const addForm = useForm<z.infer<typeof createDataItemSchema>>({
    resolver: zodResolver(createDataItemSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "active" as const,
      role: "user" as const,
    },
  });

  const editForm = useForm<z.infer<typeof updateDataItemSchema>>({
    resolver: zodResolver(updateDataItemSchema),
    defaultValues: {
      name: "",
      email: "",
      status: "active" as const,
      role: "user" as const,
    },
  });

  // Fetch data
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await dataService.getItems({
        page: meta.page,
        pageSize: meta.pageSize,
        search: searchQuery,
        status: statusFilter === "all" ? undefined : statusFilter, // Pass undefined if 'all'
        role: roleFilter === "all" ? undefined : roleFilter, // Pass undefined if 'all'
      });
      setData(result.items);
      setMeta(result.meta);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data load and when filters change
  useEffect(() => {
    fetchData();
  }, [meta.page, searchQuery, statusFilter, roleFilter]);

  // Table columns
  const columns: ColumnDef<DataItem>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (item) => <div className="font-medium">{item.name}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: (item) => <div>{item.email}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (item) => (
        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
          item.status === "active" 
            ? "bg-green-100 text-green-700" 
            : item.status === "inactive" 
            ? "bg-red-100 text-red-700"
            : "bg-yellow-100 text-yellow-700"
        }`}>
          {item.status}
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: (item) => <div>{item.role}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: (item) => (
        <div>{new Date(item.createdAt).toLocaleDateString()}</div>
      ),
    },
  ];

  // Add item
  const handleAddItem = async (values: any) => {
    try {
      const newItem = await dataService.createItem(values);
      await fetchData();
      setIsAddDialogOpen(false);
      addForm.reset();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Edit item
  const handleEditItem = (item: DataItem) => {
    setSelectedItem(item);
    editForm.reset({
      name: item.name,
      email: item.email,
      status: item.status,
      role: item.role,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = async (values: any) => {
    if (!selectedItem) return;
    
    try {
      await dataService.updateItem(selectedItem.id, values);
      await fetchData();
      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete item
  const handleDeleteItem = (item: DataItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedItem) return;
    
    try {
      await dataService.deleteItem(selectedItem.id);
      await fetchData();
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
        <p className="text-muted-foreground">
          Manage your data records with full CRUD operations.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Select 
            value={roleFilter} 
            onValueChange={setRoleFilter}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new user.
              </DialogDescription>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddItem)} className="space-y-4">
                <FormField
                  control={addForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange} 
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select 
                        value={field.value} 
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="editor">Editor</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage your users and their access levels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data}
            columns={columns}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            onSearch={(query) => {
              setSearchQuery(query);
              setMeta({ ...meta, page: 1 }); // Reset to first page on search
            }}
            pagination={{
              page: meta.page,
              pageSize: meta.pageSize,
              totalItems: meta.totalItems,
              totalPages: meta.totalPages,
              onPageChange: (page) => setMeta({ ...meta, page }),
            }}
          />
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleUpdateItem)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedItem?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
