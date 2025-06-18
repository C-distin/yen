"use server";

import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { applicationSchema, type applicationData } from "./schema";
import { revalidatePath } from "next/cache";
import { uploadFile } from "@/lib/supabase";

export async function submitApplication(jobId: number, data: applicationData) {
  try {
    const result = applicationSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: result.error.format() };
    }

    // Upload resume to Supabase Storage
    const timestamp = Date.now();
    const fileName = `${timestamp}-${result.data.resume.name}`;
    const filePath = `resumes/${fileName}`;
    
    const uploadResult = await uploadFile(result.data.resume, 'job-applications', filePath);
    
    if (uploadResult.error) {
      console.error("Error uploading resume:", uploadResult.error);
      return { success: false, error: "Failed to upload resume" };
    }

    // Save application to database with resume URL
    await db.insert(applications).values({
      jobId,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      resume: uploadResult.publicUrl!,
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