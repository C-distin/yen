"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { companies, jobs } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// create company action
export async function createCompany(data: {
  name: string;
  logo?: string | null;
  description?: string | null;
  founded?: string | null;
  location?: string | null;
  employees?: string | null;
  website?: string | null;
}) {
  try {
    await db
      .insert(companies)
      .values({ 
        ...data, 
        createdAt: new Date(), 
        updatedAt: new Date() 
      });
    
    revalidatePath("/dashboard");
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
    logo?: string | null;
    description?: string | null;
    founded?: string | null;
    location?: string | null;
    employees?: string | null;
    website?: string | null;
  }
) {
  try {
    await db
      .update(companies)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(companies.id, id));
    
    revalidatePath("/dashboard");
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
      await tx.delete(jobs).where(eq(jobs.companyId, id));
      await tx.delete(companies).where(eq(companies.id, id));
    });
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting company:", error);
    throw new Error("Failed to delete company");
  }
}

export async function getCompanies() {
  try {
    return await db.select().from(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    return [];
  }
}

export async function getCompanyById(id: number) {
  try {
    return await db.select().from(companies).where(eq(companies.id, id));
  } catch (error) {
    console.error("Error fetching company:", error);
    return [];
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
    return { success: true };
  } catch (error) {
    console.error("Error updating job:", error);
    throw new Error("Failed to update job");
  }
}

// delete job action
export async function deleteJob(id: number) {
  try {
    await db.delete(jobs).where(eq(jobs.id, id));
    
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Failed to delete job");
  }
}

export async function getJobs() {
  try {
    return await db.select().from(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getJobById(id: number) {
  try {
    return await db.select().from(jobs).where(eq(jobs.id, id));
  } catch (error) {
    console.error("Error fetching job:", error);
    return [];
  }
}

// analytics
export async function getAnalytics() {
  try {
    const [totalJobs] = await db.select({ count: count(jobs.id) }).from(jobs);
    const [totalCompanies] = await db.select({ count: count(companies.id) }).from(companies);
    
    return {
      totalJobs: totalJobs.count,
      totalCompanies: totalCompanies.count,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return {
      totalJobs: 0,
      totalCompanies: 0,
    };
  }
}