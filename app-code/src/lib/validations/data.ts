import { z } from "zod";

// Schema for data items
export const dataItemSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  status: z.enum(["active", "inactive", "pending"]),
  role: z.enum(["admin", "user", "editor"]),
  createdAt: z.date(),
});

// Schema for data item creation
export const createDataItemSchema = dataItemSchema.omit({ 
  id: true,
  createdAt: true 
});

// Schema for data item update
export const updateDataItemSchema = createDataItemSchema.partial();

export type DataItem = z.infer<typeof dataItemSchema>;
export type CreateDataItem = z.infer<typeof createDataItemSchema>;
export type UpdateDataItem = z.infer<typeof updateDataItemSchema>;
