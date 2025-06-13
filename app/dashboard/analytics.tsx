import { Card } from "@/components/ui/card";

export function Analytics({ totalJobs, totalCompanies }: { totalJobs: number; totalCompanies: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Total Jobs</h3>
        <p className="text-2xl font-bold">{totalJobs}</p>
      </Card>
      <Card className="p-6">
        <h3 className="text-sm font-medium text-muted-foreground">Total Companies</h3>
        <p className="text-2xl font-bold">{totalCompanies}</p>
      </Card>
    </div>
  );
}