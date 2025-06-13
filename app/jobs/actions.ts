"use server";

import { db } from "@/lib/db";
import { jobs, companies } from "@/lib/db/schema";
import { eq, desc, like, or, and } from "drizzle-orm";

export interface JobWithCompany {
  id: number;
  title: string;
  companyId: number;
  location: string;
  salary: string | null;
  type: string;
  category: string;
  description: string;
  requirements: string;
  benefits: string;
  featured: boolean;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  company: {
    id: number;
    name: string;
    logo: string | null;
    location: string | null;
  };
}

export async function getJobs(filters?: {
  search?: string;
  location?: string;
  type?: string;
  category?: string;
}): Promise<JobWithCompany[]> {
  try {
    let query = db
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

    if (filters) {
      const conditions = [];

      if (filters.search) {
        conditions.push(
          or(
            like(jobs.title, `%${filters.search}%`),
            like(jobs.description, `%${filters.search}%`),
            like(companies.name, `%${filters.search}%`)
          )
        );
      }

      if (filters.location) {
        conditions.push(like(jobs.location, `%${filters.location}%`));
      }

      if (filters.type) {
        conditions.push(eq(jobs.type, filters.type));
      }

      if (filters.category) {
        conditions.push(eq(jobs.category, filters.category));
      }

      if (conditions.length > 0) {
        query = query.where(and(...conditions)) as typeof query;
      }
    }

    const result = await query;
    return result as JobWithCompany[];
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
}

export async function getFeaturedJobs(): Promise<JobWithCompany[]> {
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

    return result as JobWithCompany[];
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    return [];
  }
}

export async function getJobById(id: number): Promise<JobWithCompany | null> {
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
      .where(eq(jobs.id, id))
      .limit(1);

    return result[0] as JobWithCompany || null;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
}