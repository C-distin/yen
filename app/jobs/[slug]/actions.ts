"use server";

import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { applicationSchema, type applicationData } from "./schema";
import { revalidatePath } from "next/cache";

export async function submitApplication(jobId: number, data: applicationData) {
  try {
    const result = applicationSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: result.error.format() };
    }

    // In a real application, you would upload the resume file to a storage service
    // For now, we'll store a placeholder URL
    const resumeUrl = "placeholder-resume-url"; // This should be replaced with actual file upload logic

    await db.insert(applications).values({
      jobId,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      resume: resumeUrl,
      coverLetter: result.data.coverLetter || null,
      createdAt: new Date(),
    });

    revalidatePath(`/jobs/${jobId}`);
    return { success: true };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, error: "Failed to submit application" };
  }
}