import { pgTable, serial, varchar, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";

export const companies = pgTable('companies', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    logo: text('logo'),
    description: text('description'),
    founded: varchar('founded', { length: 50 }), // Adjusted length
    location: varchar('location', { length: 256 }),
    employees: varchar('employees', { length: 50 }), // Adjusted length
    website: varchar('website', { length: 512 }),
    email: varchar('email', { length: 256 }), // Added email field
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  });
  
  export const jobs = pgTable('jobs', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    companyId: integer('company_id').references(() => companies.id).notNull(),
    logo: text('logo'), // Company logo can be denormalized here or joined
    location: varchar('location', { length: 256 }).notNull(),
    salary: varchar('salary', { length: 100 }),
    type: varchar('type', { length: 50 }).notNull(), // Full-time, Part-time etc.
    category: varchar('category', { length: 100 }).notNull(),
    description: text('description').notNull(),
    requirements: text('requirements').notNull(), // Storing as text, can be JSON/JSONB for structured data
    benefits: text('benefits').notNull(), // Storing as text, can be JSON/JSONB for structured data
    postedAt: timestamp('posted_at').defaultNow().notNull(),
    featured: boolean('featured').default(false),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  });

  export const applications = pgTable("applications", {
    id: serial("id").primaryKey(),
    jobId: integer("job_id").references(() => jobs.id).notNull(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: varchar("phone", {length: 20}),
    resume: text("resume").notNull(),
    coverLetter: text("cover_letter"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  // Infer types for Drizzle (optional but good practice)
  export type Company = typeof companies.$inferSelect; // for select
  export type NewCompany = typeof companies.$inferInsert; // for insert
  
  export type Job = typeof jobs.$inferSelect; // for select
  export type NewJob = typeof jobs.$inferInsert; // for insert

  export type Application = typeof applications.$inferSelect; // for select
  export type NewApplication = typeof applications.$inferInsert; // for insert