import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export function CompanyList({ companies }: { companies: Array<{ id: number; name: string; location: string; featured: boolean }> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Companies</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies.map((company) => (
            <TableRow key={company.id}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.location}</TableCell>
              <TableCell><Badge>{company.featured ? "Yes" : "No"}</Badge></TableCell>
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