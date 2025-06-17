import { z } from "zod";

export const companySchema = z.object({
  name: z.string().min(1, "Company name is required").max(256, "Name is too long"),
  logo: z.instanceof(File)
    .refine(file => file.size <= 1024 * 1024 * 5, "Logo must be less than 5MB")
    .refine(
      file => ["image/jpeg", "image/jpg", "image/png"].includes(file.type),
      "Logo must be a JPG or PNG image"
    )
    .optional(),
  description: z.string().optional(),
  founded: z.string().max(50, "Founded year is too long").optional(),
  location: z.string().max(256, "Location is too long").optional(),
  employees: z.string().max(50, "Employee count is too long").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
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