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
  title: z.string().min(1, "Job title is required"),
  companyId: z.number().min(1, "Select a company"),
  location: z.string().min(1, "Location is required"),
  salary: z.string().optional(),
  type: z.enum(["Full-time", "Part-time", "Remote", "Contract", "Internship"], {
    message: "Invalid job type",
  }),
  category: z.enum(
    [
      "Design",
      "Development",
      "Marketing",
      "Sales",
      "Other",
      "Administration",
      "Support",
      "Production",
      "Project Management",
      "Research",
    ],
    { message: "Invalid job category" },
  ),
  description: z.string().min(10, "Description is too short"),
  requirements: z.string().min(10, "Requirements are too short"),
  benefits: z.string().min(10, "Benefits are too short"),
  featured: z.boolean().default(false),
});

export type jobData = z.infer<typeof jobSchema>;
