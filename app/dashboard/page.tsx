import { Dashboard } from "./dashboard";
import { getJobs, getCompanies, getAnalytics } from "./actions";

export const metadata = {
  title: "Admin Dashboard | YenDaakye - Manage Jobs & Companies",
  description:
    "Admin dashboard for managing job postings, companies, and tracking performance metrics on YenDaakye Job Center platform.",
  keywords:
    "admin dashboard, job management, company management, analytics, yendaakye admin",
};

export default async function Page() {
  const [jobs, companies, analytics] = await Promise.all([
    getJobs(),
    getCompanies(),
    getAnalytics(),
  ]);

  // Transform companies data to match expected interface
  const transformedCompanies = companies.map(company => ({
    ...company,
    featured: false, // Add default featured status since it's not in the schema
  }));

  return (
    <main>
      <Dashboard 
        jobs={jobs}
        companies={transformedCompanies} 
        analytics={analytics} 
      />
    </main>
  );
}