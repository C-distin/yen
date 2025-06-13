import { z } from "zod/v4";

export const companySchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.url({ message: "Invalid URl" }).optional(),
  description: z.string().optional(),
  founded: z.string().max(50, "Founded is too long").optional(),
  location: z.string().max(256, "Location is too long").optional(),
  employees: z.string().max(50, "Employees is too long").optional(),
  website: z.url({ message: "Invalid URl" }).optional(),
});

export type companyData = z.infer<typeof companySchema>;

export const jobSchema = z.object({
  title: z.string().min(1, "Job title is required").max(256),
  companyId: z.number().min(1, "Please select a company"),
  location: z.string().min(1, "Location is required").max(256),
  salary: z.string().max(100).optional(),
  type: z.string().min(1, "Job type is required").max(50),
  category: z.string().min(1, "Category is required").max(100),
  description: z.string().min(1, "Description is required"),
  requirements: z.string().min(1, "Requirements are required"),
  benefits: z.string().min(1, "Benefits are required"),
  featured: z.boolean().default(false),
});

export type jobData = z.infer<typeof jobSchema>;