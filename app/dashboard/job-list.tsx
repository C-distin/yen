"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, Calendar, AlertTriangle, Users } from "lucide-react";
import { deleteJob, getApplicationsByJobId, type ApplicationWithJob } from "./actions";
import { JobApplications } from "./job-applications";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [selectedJobApplications, setSelectedJobApplications] = useState<{
    jobId: number;
    jobTitle: string;
    applications: ApplicationWithJob[];
  } | null>(null);
  const [loadingApplications, setLoadingApplications] = useState<number | null>(null);

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

  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    try {
      await deleteJob(id);
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleViewApplications = async (jobId: number, jobTitle: string) => {
    setLoadingApplications(jobId);
    try {
      const applications = await getApplicationsByJobId(jobId);
      setSelectedJobApplications({
        jobId,
        jobTitle,
        applications,
      });
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoadingApplications(null);
    }
  };

  const handleView = (id: number) => {
    window.open(`/jobs/${id}`, '_blank');
  };

  const handleEdit = (id: number) => {
    // TODO: Implement edit functionality
    console.log("Edit job:", id);
  };

  // If viewing applications for a specific job
  if (selectedJobApplications) {
    return (
      <JobApplications
        jobId={selectedJobApplications.jobId}
        jobTitle={selectedJobApplications.jobTitle}
        applications={selectedJobApplications.applications}
        onBack={() => setSelectedJobApplications(null)}
      />
    );
  }

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
                      onClick={() => handleViewApplications(job.id, job.title)}
                      disabled={loadingApplications === job.id}
                      className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                      title="View Applications"
                    >
                      {loadingApplications === job.id ? (
                        <div className="w-4 h-4 border-2 border-purple-600/30 border-t-purple-600 rounded-full animate-spin" />
                      ) : (
                        <Users size={16} />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleView(job.id)}
                      className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                      title="View Job"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEdit(job.id)}
                      className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                      title="Edit Job"
                    >
                      <Edit size={16} />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                          title="Delete Job"
                          disabled={isDeleting === job.id}
                        >
                          {isDeleting === job.id ? (
                            <div className="w-4 h-4 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
                          ) : (
                            <Trash size={16} />
                          )}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle size={20} className="text-red-600" />
                            Delete Job Posting
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{job.title}"? This action cannot be undone and will permanently remove the job posting and all associated applications.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(job.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Job
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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