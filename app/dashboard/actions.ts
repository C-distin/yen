"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { companies, jobs } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

// create company action
export async function createCompany(data: typeof companies.$inferInsert) {
  await db
    .insert(companies)
    .values({ ...data, createdAt: new Date(), updatedAt: new Date() });
  redirect("/bashboard");
}

// update company action
export async function updateCompany(
  id: number,
  data: typeof companies.$inferInsert,
) {
  await db
    .update(companies)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(companies.id, id));
  redirect("/bashboard");
}

// delete company action
export async function deleteCompany(id: number) {
  await db.transaction(async (tx) => {
    await tx.delete(jobs).where(eq(jobs.companyId, id));
    await tx.delete(companies).where(eq(companies.id, id));
  });
  redirect("/bashboard");
}

export async function getCompanies() {
  return await db.select().from(companies)
}

export async function getCompanyById(id: number) {
  return await db.select().from(companies).where(eq(companies.id, id))
}

// create job action
export async function createJob(data: typeof jobs.$inferInsert) {
  await db.insert(jobs).values({
    ...data,
    postedAt: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  redirect("/bashboard");
}

// update job action
export async function updateJob(id: number, data: typeof jobs.$inferInsert) {
  await db
    .update(jobs)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(jobs.id, id));
  redirect("/bashboard");
}

// delete job action
export async function deleteJob(id: number) {
  await db.delete(jobs).where(eq(jobs.id, id));
  redirect("/bashboard");
}

export async function getJobs() {
  return await db.select().from(jobs)
}

export async function getJobById(id: number) {
  return await db.select().from(jobs).where(eq(jobs.id, id))
}

// analytics
export async function getAnalytics() {
  const [totalJobs] = await db.select({ count: count(jobs.id) }).from(jobs)
  const [totalCompanies] = await db.select({ count: count(companies.id) }).from(companies)
  
  return {
    totalJobs: totalJobs.count,
    totalCompanies: totalCompanies.count,
  }
}