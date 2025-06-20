import { z } from "zod";

export const applicationSchema = z.object({
  name: z.string().min(3, "Enter your name"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must not exceed 15 digits").optional(),
  resume: z.instanceof(File)
    .refine(file => file.type === "application/pdf", "Resume must be a PDF file")
    .refine(file => file.size <= 1024 * 1024 * 5, "Resume must be less than 5MB"),
  coverLetter: z.string().optional(),
});

export type applicationData = z.infer<typeof applicationSchema>;