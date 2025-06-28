"use server";

import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { applicationSchema, type applicationData } from "./schema";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { NewApplicationNotificationEmail } from "@/components/email/application-send";
import { ApplicationConfirmationEmail } from "@/components/email/application-recieved";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const resend = new Resend(process.env.RESEND_API_KEY!);

// Helper function to upload CV to Supabase Storage
async function uploadCVToSupabase(file: File, applicantName: string): Promise<string> {
  try {
    // Generate unique filename with applicant name
    const fileExt = file.name.split('.').pop();
    const sanitizedName = applicantName.replace(/[^a-zA-Z0-9]/g, '_');
    const timestamp = Date.now();
    const fileName = `${sanitizedName}_${timestamp}.${fileExt}`;
    const filePath = `job-applications/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('job-applications')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase CV upload error:', error);
      throw new Error(`Failed to upload CV: ${error.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('job-applications')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading CV:', error);
    throw new Error('Failed to upload CV to storage');
  }
}

export async function submitApplication(jobId: number, data: applicationData) {
  try {
    const result = applicationSchema.safeParse(data);

    if (!result.success) {
      return { success: false, error: result.error.format() };
    }

    // Upload resume to Supabase Storage
    const cvUrl = await uploadCVToSupabase(result.data.resume, result.data.name);

    // Save application to database with resume URL
    const [application] = await db.insert(applications).values({
      jobId,
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      resume: cvUrl,
      coverLetter: result.data.coverLetter || null,
      createdAt: new Date(),
    }).returning();

    // Get job details for email
    const jobDetails = await db.query.jobs.findFirst({
      where: (jobs, { eq }) => eq(jobs.id, jobId),
      with: {
        company: true,
      },
    });

    // Send confirmation email to applicant
    try {
      await resend.emails.send({
        from: "YenDaakye Job Center <noreply@yendaakyejobscenter.com>",
        to: [result.data.email],
        subject: `Application Received - ${jobDetails?.title}`,
        react: ApplicationConfirmationEmail({
          fullName: result.data.name,
          email: result.data.email,
          phoneNumber: result.data.phone || "Not provided",
          cvFileName: result.data.resume.name,
          coverLetterPreview: result.data.coverLetter?.substring(0, 100) || "No cover letter provided",
        }),
      });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Don't fail the application submission if email fails
    }

    // Send notification email to employer
    try {
      await resend.emails.send({
        from: "YenDaakye Job Center <applications@yendaakyejobscenter.com>",
        to: ["yendaakyejobscenter@proton.me"], // Replace with actual employer email
        subject: `New Application: ${jobDetails?.title}`,
        react: NewApplicationNotificationEmail({
          fullName: result.data.name,
          email: result.data.email,
          phoneNumber: result.data.phone || "Not provided",
          cvFileName: result.data.resume.name,
          coverLetter: result.data.coverLetter || "No cover letter provided",
          positionApplied: jobDetails?.title || "Unknown Position",
          applicationDate: new Date().toLocaleDateString(),
        }),
        attachments: [
          {
            filename: result.data.resume.name,
            content: await result.data.resume.arrayBuffer(),
          },
        ],
      });
    } catch (emailError) {
      console.error("Error sending notification email:", emailError);
      // Don't fail the application submission if email fails
    }

    revalidatePath(`/jobs/${jobId}`);
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error submitting application:", error);
    return { success: false, error: "Failed to submit application" };
  }
}