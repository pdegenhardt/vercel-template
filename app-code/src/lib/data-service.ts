import { DataItem, CreateDataItem, UpdateDataItem } from "./validations/data";

// Sample data for demonstration purposes
const sampleData: DataItem[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "admin",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "user",
    createdAt: new Date("2024-02-10"),
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "editor",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice@example.com",
    status: "pending",
    role: "user",
    createdAt: new Date("2024-03-05"),
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie@example.com",
    status: "active",
    role: "user",
    createdAt: new Date("2024-02-15"),
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana@example.com",
    status: "active",
    role: "editor",
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "7",
    name: "Edward Smith",
    email: "edward@example.com",
    status: "inactive",
    role: "user",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "8",
    name: "Fiona Green",
    email: "fiona@example.com",
    status: "pending",
    role: "user",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "9",
    name: "George Wilson",
    email: "george@example.com",
    status: "active",
    role: "admin",
    createdAt: new Date("2024-01-30"),
  },
  {
    id: "10",
    name: "Hannah Adams",
    email: "hannah@example.com",
    status: "active",
    role: "user",
    createdAt: new Date("2024-03-15"),
  },
];

// In-memory data storage
let data = [...sampleData];

// Simulate server delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Data service with simulated API calls
export const dataService = {
  // Fetch all data items with pagination, filtering, and sorting
  async getItems({
    page = 1,
    pageSize = 10,
    search = "",
    status = "",
    role = "",
    sort = "createdAt",
    order = "desc",
  }: {
    page?: number;
    pageSize?: number;
    search?: string;
    status?: string;
    role?: string;
    sort?: string;
    order?: "asc" | "desc";
  }) {
    await delay(500); // Simulate network delay

    let filteredData = [...data];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchLower) ||
          item.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (status) {
      filteredData = filteredData.filter((item) => item.status === status);
    }

    // Apply role filter
    if (role) {
      filteredData = filteredData.filter((item) => item.role === role);
    }

    // Apply sorting
    filteredData.sort((a: any, b: any) => {
      const aValue = a[sort as keyof DataItem];
      const bValue = b[sort as keyof DataItem];

      if (aValue < bValue) return order === "asc" ? -1 : 1;
      if (aValue > bValue) return order === "asc" ? 1 : -1;
      return 0;
    });

    // Apply pagination
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const paginatedData = filteredData.slice(
      (page - 1) * pageSize,
      page * pageSize
    );

    return {
      items: paginatedData,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
      },
    };
  },

  // Get a single item by ID
  async getItem(id: string) {
    await delay(300);
    const item = data.find((item) => item.id === id);
    if (!item) throw new Error("Item not found");
    return item;
  },

  // Create a new item
  async createItem(item: CreateDataItem) {
    await delay(500);
    const newItem: DataItem = {
      ...item,
      id: String(data.length + 1),
      createdAt: new Date(),
    };
    data.push(newItem);
    return newItem;
  },

  // Update an existing item
  async updateItem(id: string, updates: UpdateDataItem) {
    await delay(500);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");

    data[index] = {
      ...data[index],
      ...updates,
    };

    return data[index];
  },

  // Delete an item
  async deleteItem(id: string) {
    await delay(500);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");

    const deletedItem = data[index];
    data = data.filter((item) => item.id !== id);
    return deletedItem;
  },
};
