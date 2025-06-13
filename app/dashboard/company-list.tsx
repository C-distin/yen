import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, Building2, Globe, Users as UsersIcon } from "lucide-react";

interface Company {
  id: number;
  name: string;
  location: string | null;
  featured: boolean;
  logo: string | null;
  description: string | null;
  founded: string | null;
  employees: string | null;
  website: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  if (companies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 size={24} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
        <p className="text-slate-600">Start by adding your first company.</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            All Companies ({companies.length})
          </h3>
          <p className="text-sm text-slate-600">
            Manage company profiles and information
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">Company</TableHead>
              <TableHead className="font-semibold text-slate-700">Location</TableHead>
              <TableHead className="font-semibold text-slate-700">Founded</TableHead>
              <TableHead className="font-semibold text-slate-700">Employees</TableHead>
              <TableHead className="font-semibold text-slate-700">Website</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, index) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <Building2 size={16} className="text-white" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{company.name}</p>
                      {company.description && (
                        <p className="text-sm text-slate-500 line-clamp-1">
                          {company.description.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{company.location || "Not specified"}</span>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{company.founded || "N/A"}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UsersIcon size={14} className="text-slate-400" />
                    <span className="text-slate-700">{company.employees || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {company.website ? (
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-slate-400" />
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-600 hover:text-teal-700 text-sm"
                      >
                        Visit
                      </a>
                    </div>
                  ) : (
                    <span className="text-slate-500">No website</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={company.featured ? "bg-amber-100 text-amber-800 border-0" : "bg-gray-100 text-gray-800 border-0"}>
                    {company.featured ? "Featured" : "Standard"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );
}