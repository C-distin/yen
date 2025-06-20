"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { companies, jobs, applications } from "@/lib/db/schema";
import { eq, count, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Helper function to handle file upload (placeholder for now)
async function uploadFile(file: File): Promise<string> {
  // In a real application, you would upload to a cloud storage service like:
  // - AWS S3
  // - Cloudinary
  // - Vercel Blob
  // - Supabase Storage
  
  // For now, we'll create a placeholder URL
  // You should replace this with actual file upload logic
  const fileName = `${Date.now()}-${file.name}`;
  const uploadUrl = `/uploads/${fileName}`;
  
  // TODO: Implement actual file upload logic here
  // Example with Cloudinary:
  // const formData = new FormData();
  // formData.append('file', file);
  // formData.append('upload_preset', 'your_preset');
  // const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud/image/upload', {
  //   method: 'POST',
  //   body: formData
  // });
  // const data = await response.json();
  // return data.secure_url;
  
  return uploadUrl;
}

// create company action
export async function createCompany(data: {
  name: string;
  logo?: File | null;
  description?: string | null;
  founded?: string | null;
  location?: string | null;
  employees?: string | null;
  website?: string | null;
  email?: string | null;
}) {
  try {
    let logoUrl: string | null = null;
    
    // Handle file upload if logo is provided
    if (data.logo && data.logo instanceof File) {
      logoUrl = await uploadFile(data.logo);
    }
    
    await db
      .insert(companies)
      .values({ 
        name: data.name,
        logo: logoUrl,
        description: data.description,
        founded: data.founded,
        location: data.location,
        employees: data.employees,
        website: data.website,
        email: data.email,
        createdAt: new Date(), 
        updatedAt: new Date() 
      });
    
    revalidatePath("/dashboard");
    revalidatePath("/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating company:", error);
    throw new Error("Failed to create company");
  }
}

// update company action
export async function updateCompany(
  id: number,
  data: {
    name: string;
    logo?: File | null;
    description?: string | null;
    founded?: string | null;
    location?: string | null;
    employees?: string | null;
    website?: string | null;
    email?: string | null;
  }
) {
  try {
    let logoUrl: string | null = null;
    
    // Handle file upload if logo is provided
    if (data.logo && data.logo instanceof File) {
      logoUrl = await uploadFile(data.logo);
    }
    
    const updateData: any = {
      name: data.name,
      description: data.description,
      founded: data.founded,
      location: data.location,
      employees: data.employees,
      website: data.website,
      email: data.email,
      updatedAt: new Date()
    };
    
    // Only update logo if a new file was provided
    if (logoUrl) {
      updateData.logo = logoUrl;
    }
    
    await db
      .update(companies)
      .set(updateData)
      .where(eq(companies.id, id));
    
    revalidatePath("/dashboard");
    revalidatePath("/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating company:", error);
    throw new Error("Failed to update company");
  }
}

// delete company action
export async function deleteCompany(id: number) {
  try {
    await db.transaction(async (tx) => {
      // First delete all applications for jobs of this company
      const companyJobs = await tx.select({ id: jobs.id }).from(jobs).where(eq(jobs.companyId, id));
      const jobIds = companyJobs.map(job => job.id);
      
      if (jobIds.length > 0) {
        for (const jobId of jobIds) {
          await tx.delete(applications).where(eq(applications.jobId, jobId));
        }
      }
      
      // Then delete all jobs for this company
      await tx.delete(jobs).where(eq(jobs.companyId, id));
      
      // Finally delete the company
      await tx.delete(companies).where(eq(companies.id, id));
    });
    
    revalidatePath("/dashboard");
    revalidatePath("/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting company:", error);
    throw new Error("Failed to delete company");
  }
}

export async function getCompanies() {
  try {
    return await db.select().from(companies).orderBy(desc(companies.createdAt));
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

export async function getCompanyById(id: number) {
  try {
    const result = await db.select().from(companies).where(eq(companies.id, id));
    return result[0] || null;
  } catch (error) {
    console.error("Error fetching company:", error);
    return null;
  }
}

// create job action
export async function createJob(data: {
  title: string;
  companyId: number;
  location: string;
  salary?: string;
  type: string;
  category: string;
  description: string;
  requirements: string;
  benefits: string;
  featured?: boolean;
}) {
  try {
    await db.insert(jobs).values({
      ...data,
      postedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    revalidatePath("/dashboard");
    revalidatePath("/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating job:", error);
    throw new Error("Failed to create job");
  }
}

// update job action
export async function updateJob(id: number, data: {
  title: string;
  companyId: number;
  location: string;
  salary?: string;
  type: string;
  category: string;
  description: string;
  requirements: string;
  benefits: string;
  featured?: boolean;
}) {
  try {
    await db
      .update(jobs)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(jobs.id, id));
    
    revalidatePath("/dashboard");
    revalidatePath("/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job");
  }
}

// delete job action
export async function deleteJob(id: number) {
  try {
    await db.transaction(async (tx) => {
      // First delete all applications for this job
      await tx.delete(applications).where(eq(applications.jobId, id));
      
      // Then delete the job
      await tx.delete(jobs).where(eq(jobs.id, id));
    });
    
    revalidatePath("/dashboard");
    revalidatePath("/jobs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}

// Updated getJobs function to include company information
export async function getJobs() {
  try {
    const result = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        companyId: jobs.companyId,
        location: jobs.location,
        salary: jobs.salary,
        type: jobs.type,
        category: jobs.category,
        description: jobs.description,
        requirements: jobs.requirements,
        benefits: jobs.benefits,
        featured: jobs.featured,
        postedAt: jobs.postedAt,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        company: {
          id: companies.id,
          name: companies.name,
          logo: companies.logo,
          location: companies.location,
        },
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .orderBy(desc(jobs.featured), desc(jobs.postedAt));

    return result.map(row => ({
      ...row,
      featured: row.featured ?? false,
      company: {
        id: row.company?.id ?? 0,
        name: row.company?.name ?? "Unknown Company",
        logo: row.company?.logo ?? null,
        location: row.company?.location ?? null,
      }
    }));
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

// Updated getFeaturedJobs function
export async function getFeaturedJobs() {
  try {
    const result = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        companyId: jobs.companyId,
        location: jobs.location,
        salary: jobs.salary,
        type: jobs.type,
        category: jobs.category,
        description: jobs.description,
        requirements: jobs.requirements,
        benefits: jobs.benefits,
        featured: jobs.featured,
        postedAt: jobs.postedAt,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        company: {
          id: companies.id,
          name: companies.name,
          logo: companies.logo,
          location: companies.location,
        },
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(jobs.featured, true))
      .orderBy(desc(jobs.postedAt))
      .limit(6);

    return result.map(row => ({
      ...row,
      featured: row.featured ?? false,
      company: {
        id: row.company?.id ?? 0,
        name: row.company?.name ?? "Unknown Company",
        logo: row.company?.logo ?? null,
        location: row.company?.location ?? null,
      }
    }));
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    return [];
  }
}

export async function getJobById(id: number) {
  try {
    const result = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        companyId: jobs.companyId,
        location: jobs.location,
        salary: jobs.salary,
        type: jobs.type,
        category: jobs.category,
        description: jobs.description,
        requirements: jobs.requirements,
        benefits: jobs.benefits,
        featured: jobs.featured,
        postedAt: jobs.postedAt,
        createdAt: jobs.createdAt,
        updatedAt: jobs.updatedAt,
        company: {
          id: companies.id,
          name: companies.name,
          logo: companies.logo,
          location: companies.location,
        },
      })
      .from(jobs)
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(jobs.id, id));

    if (result.length === 0) return null;

    const row = result[0];
    return {
      ...row,
      featured: row.featured ?? false,
      company: {
        id: row.company?.id ?? 0,
        name: row.company?.name ?? "Unknown Company",
        logo: row.company?.logo ?? null,
        location: row.company?.location ?? null,
      }
    };
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}

// Application types
export interface ApplicationWithJob {
  id: number;
  jobId: number;
  name: string;
  email: string;
  phone: string | null;
  resume: string;
  coverLetter: string | null;
  createdAt: Date;
  job?: {
    id: number;
    title: string;
    company?: {
      id: number;
      name: string;
      logo: string | null;
    };
  };
}

// Get all applications with job and company information
export async function getApplications(): Promise<ApplicationWithJob[]> {
  try {
    const result = await db
      .select({
        id: applications.id,
        jobId: applications.jobId,
        name: applications.name,
        email: applications.email,
        phone: applications.phone,
        resume: applications.resume,
        coverLetter: applications.coverLetter,
        createdAt: applications.createdAt,
        job: {
          id: jobs.id,
          title: jobs.title,
          company: {
            id: companies.id,
            name: companies.name,
            logo: companies.logo,
          },
        },
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .orderBy(desc(applications.createdAt));

    return result.map(row => ({
      id: row.id,
      jobId: row.jobId,
      name: row.name,
      email: row.email,
      phone: row.phone,
      resume: row.resume,
      coverLetter: row.coverLetter,
      createdAt: row.createdAt,
      job: row.job ? {
        id: row.job.id,
        title: row.job.title,
        company: row.job.company ? {
          id: row.job.company.id,
          name: row.job.company.name,
          logo: row.job.company.logo,
        } : undefined,
      } : undefined,
    }));
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

// Get applications for a specific job
export async function getApplicationsByJobId(jobId: number): Promise<ApplicationWithJob[]> {
  try {
    const result = await db
      .select({
        id: applications.id,
        jobId: applications.jobId,
        name: applications.name,
        email: applications.email,
        phone: applications.phone,
        resume: applications.resume,
        coverLetter: applications.coverLetter,
        createdAt: applications.createdAt,
        job: {
          id: jobs.id,
          title: jobs.title,
          company: {
            id: companies.id,
            name: companies.name,
            logo: companies.logo,
          },
        },
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(applications.jobId, jobId))
      .orderBy(desc(applications.createdAt));

    return result.map(row => ({
      id: row.id,
      jobId: row.jobId,
      name: row.name,
      email: row.email,
      phone: row.phone,
      resume: row.resume,
      coverLetter: row.coverLetter,
      createdAt: row.createdAt,
      job: row.job ? {
        id: row.job.id,
        title: row.job.title,
        company: row.job.company ? {
          id: row.job.company.id,
          name: row.job.company.name,
          logo: row.job.company.logo,
        } : undefined,
      } : undefined,
    }));
  } catch (error) {
    console.error("Error fetching applications for job:", error);
    return [];
  }
}

// Delete application
export async function deleteApplication(id: number) {
  try {
    await db.delete(applications).where(eq(applications.id, id));
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting application:", error);
    throw new Error("Failed to delete application");
  }
}

// analytics
export async function getAnalytics() {
  try {
    const [totalJobs] = await db.select({ count: count(jobs.id) }).from(jobs);
    const [totalCompanies] = await db.select({ count: count(companies.id) }).from(companies);
    const [totalApplications] = await db.select({ count: count(applications.id) }).from(applications);
    
    return {
      totalJobs: totalJobs.count,
      totalCompanies: totalCompanies.count,
      totalApplications: totalApplications.count,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalJobs: 0,
      totalCompanies: 0,
      totalApplications: 0,
    };
  }
}