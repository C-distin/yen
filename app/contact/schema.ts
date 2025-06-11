import { z } from "zod";

// Contact form schema with Zod validation
export const contactFormSchema = z.object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must not exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters and spaces"),
  
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must not exceed 50 characters")
      .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters and spaces"),
  
    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5, "Email must be at least 5 characters")
      .max(100, "Email must not exceed 100 characters"),
  
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(10, "Phone number must not exceed 10 characters"),
    // .regex(/^[\+]?[\d\s\-\(\)]+$/, "Please enter a valid phone number")
    // .optional()
    // .or(z.literal("")),
  
    subject: z
      .string()
      .min(5, "Subject must be at least 5 characters")
      .max(100, "Subject must not exceed 100 characters"),
  
    message: z
      .string()
      .min(10, "Message must be at least 10 characters")
      .max(1000, "Message must not exceed 1000 characters"),
  
    inquiryType: z.enum(
      ["general", "job-inquiry", "partnership", "support", "job-posting"],
      {
        required_error: "Please select an inquiry type",
      },
    ),
  });
  
  export type ContactFormData = z.infer<typeof contactFormSchema>;