"use server";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { companies, jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// create company action
export async function createCompany(data: typeof companies.$inferInsert) {
  await db.insert(companies).values(data);
  redirect("/bashboard");
}

// update company action
export async function updateCompany(
  id: number,
  data: typeof companies.$inferInsert,
) {
  await db.update(companies).set(data).where(eq(companies.id, id));
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

// create job action
export async function createJob(data: typeof jobs.$inferInsert) {
  await db.insert(jobs).values(data);
  redirect("/bashboard");
}

// update job action
export async function updateJob(id: number, data: typeof jobs.$inferInsert) {
  await db.update(jobs).set(data).where(eq(jobs.id, id));
  redirect("/bashboard");
}

// delete job action
export async function deleteJob(id: number) {
  await db.delete(jobs).where(eq(jobs.id, id));
  redirect("/bashboard");
}
