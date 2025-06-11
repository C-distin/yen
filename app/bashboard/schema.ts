import { z } from "zod/v4";

export const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.url().optional(),
  description: z.string().optional(),
  founded: z.string().max(50, "Founded is too long").optional(),
  location: z.string().max(256, "Location is too long").optional(),
  employees: z.string().max(50, "Employees is too long").optional(),
  website: z.url().optional(),
});

export type companyData = z.infer<typeof companySchema>;

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  companyId: z.number().positive().min(1, "Company ID is required"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().max(100, "Salary is too long").optional(),
  type: z.string().min(1, "Type is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements is required"),
  benefits: z.string().min(1, "Benefits is required"),
  featured: z.boolean().optional(),
});
