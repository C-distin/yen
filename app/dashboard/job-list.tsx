import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, Calendar } from "lucide-react";

interface Job {
  id: number;
  title: string;
  companyId: number;
  location: string;
  type: string;
  category: string;
  description: string;
  requirements: string;
  benefits: string;
  featured: boolean;
  postedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface JobListProps {
  jobs: Job[];
}

export function JobList({ jobs }: JobListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Full-time': 'bg-green-100 text-green-800',
      'Part-time': 'bg-blue-100 text-blue-800',
      'Contract': 'bg-orange-100 text-orange-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Remote': 'bg-teal-100 text-teal-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye size={24} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No jobs found</h3>
        <p className="text-slate-600">Start by creating your first job posting.</p>
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
            All Job Listings ({jobs.length})
          </h3>
          <p className="text-sm text-slate-600">
            Manage and monitor your job postings
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">Job Title</TableHead>
              <TableHead className="font-semibold text-slate-700">Location</TableHead>
              <TableHead className="font-semibold text-slate-700">Type</TableHead>
              <TableHead className="font-semibold text-slate-700">Category</TableHead>
              <TableHead className="font-semibold text-slate-700">Posted</TableHead>
              <TableHead className="font-semibold text-slate-700">Status</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => (
              <motion.tr
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium text-slate-900">{job.title}</p>
                    <p className="text-sm text-slate-500">Company ID: {job.companyId}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">{job.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getTypeColor(job.type)} border-0`}>
                    {job.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{job.category}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} />
                    {formatDate(job.postedAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={job.featured ? "bg-amber-100 text-amber-800 border-0" : "bg-gray-100 text-gray-800 border-0"}>
                    {job.featured ? "Featured" : "Standard"}
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