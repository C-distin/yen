import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export function JobList({ jobs }: { jobs: Array<{ id: number; title: string; company: string; location: string; type: string }> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Job Listings</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>{job.location}</TableCell>
              <TableCell><Badge>{job.type}</Badge></TableCell>
              <TableCell>
                <Button variant="ghost" size="icon"><Edit /></Button>
                <Button variant="ghost" size="icon"><Trash /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}