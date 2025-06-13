// app/dashboard/page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobList } from "./job-list";
import { CompanyList } from "./company-list";
import { getJobs } from "./actions";
import { getCompanies } from "./actions";
import { getAnalytics } from "./actions";
import { ErrorBoundary } from "./error-boundary";
import { Analytics } from "./analytics";
import { CompanyForm } from "./company";
import { JobForm } from "./job";

export default async function DashboardPage() {
  const [jobs, companies, analytics] = await Promise.all([
    getJobs(),
    getCompanies(),
    getAnalytics(),
  ]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <Tabs defaultValue="analytics" className="mt-6 space-y-4">
        <TabsList className="grid w-full grid-cols-5 gap-2">
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="jobs">Job Listings</TabsTrigger>
          <TabsTrigger value="jobForm">Create Job</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="companyForm">Create Company</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <Analytics {...analytics} />
        </TabsContent>

        <TabsContent value="jobs">
          <ErrorBoundary>
            <JobList jobs={jobs} />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="companies">
          <ErrorBoundary>
            <CompanyList companies={companies} />
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="jobForm">
          <h2 className="text-2xl font-bold">Create Job</h2>
          <JobForm />
        </TabsContent>

        <TabsContent value="companyForm">
          <h2 className="text-2xl font-bold">Create Company</h2>
          <CompanyForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
