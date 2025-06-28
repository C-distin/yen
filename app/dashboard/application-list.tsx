"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Mail, Calendar, User, FileText, Phone, Building2, Trash, AlertTriangle } from "lucide-react";
import { deleteApplication } from "./actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import type { ApplicationWithJob } from "./actions";

interface ApplicationListProps {
  applications: ApplicationWithJob[];
  jobId?: number;
}

export function ApplicationList({ applications, jobId }: ApplicationListProps) {
  const [selectedApplication, setSelectedApplication] = useState<ApplicationWithJob | null>(null);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const handleViewApplication = (application: ApplicationWithJob) => {
    setSelectedApplication(application);
  };

  const handleDownloadResume = (resumeUrl: string, applicantName: string) => {
    // Create a temporary link to download the resume
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = `${applicantName.replace(/\s+/g, '_')}_Resume.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactApplicant = (email: string, jobTitle: string) => {
    const subject = encodeURIComponent(`Re: Application for ${jobTitle}`);
    const mailtoUrl = `mailto:${email}?subject=${subject}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleDeleteApplication = async (id: number) => {
    setIsDeleting(id);
    try {
      const result = await deleteApplication(id);
      if (!result.success) {
        console.error("Failed to delete application:", result.message);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={24} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No applications found</h3>
        <p className="text-slate-600">
          {jobId ? "This job hasn't received any applications yet." : "No applications have been submitted yet."}
        </p>
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
            {jobId ? "Job Applications" : "All Applications"} ({applications.length})
          </h3>
          <p className="text-sm text-slate-600">
            Manage and review submitted applications
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">Applicant</TableHead>
              <TableHead className="font-semibold text-slate-700">Contact</TableHead>
              {!jobId && <TableHead className="font-semibold text-slate-700">Job Applied</TableHead>}
              <TableHead className="font-semibold text-slate-700">Applied Date</TableHead>
              <TableHead className="font-semibold text-slate-700">Resume</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, index) => (
              <motion.tr
                key={application.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">{application.name}</p>
                      <p className="text-sm text-slate-500">{application.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail size={12} />
                      <span>{application.email}</span>
                    </div>
                    {application.phone && (
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Phone size={12} />
                        <span>{application.phone}</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                {!jobId && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="text-slate-400" />
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{application.job?.title}</p>
                        <p className="text-xs text-slate-500">{application.job?.company?.name}</p>
                      </div>
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} />
                    {formatDate(application.createdAt)}
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadResume(application.resume, application.name)}
                    className="flex items-center gap-2"
                  >
                    <Download size={14} />
                    Download
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleViewApplication(application)}
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          title="View Application"
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                              <User size={18} className="text-white" />
                            </div>
                            Application Details
                          </DialogTitle>
                          <DialogDescription>
                            {application.job?.title} at {application.job?.company?.name}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Applicant Information */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                              <User size={18} />
                              Applicant Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg">
                              <div>
                                <label className="text-sm font-medium text-slate-600">Full Name</label>
                                <p className="text-slate-900">{application.name}</p>
                              </div>
                              <div>
                                <label className="text-sm font-medium text-slate-600">Email</label>
                                <p className="text-slate-900">{application.email}</p>
                              </div>
                              {application.phone && (
                                <div>
                                  <label className="text-sm font-medium text-slate-600">Phone</label>
                                  <p className="text-slate-900">{application.phone}</p>
                                </div>
                              )}
                              <div>
                                <label className="text-sm font-medium text-slate-600">Applied Date</label>
                                <p className="text-slate-900">{formatDate(application.createdAt)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Cover Letter */}
                          {application.coverLetter && (
                            <div className="space-y-4">
                              <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                                <FileText size={18} />
                                Cover Letter
                              </h4>
                              <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-teal-500">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                                  {application.coverLetter}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-3 pt-4 border-t border-slate-200">
                            <Button
                              onClick={() => handleDownloadResume(application.resume, application.name)}
                              className="flex items-center gap-2"
                            >
                              <Download size={16} />
                              Download Resume
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleContactApplicant(application.email, application.job?.title || '')}
                              className="flex items-center gap-2"
                            >
                              <Mail size={16} />
                              Contact Applicant
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleContactApplicant(application.email, application.job?.title || '')}
                      className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                      title="Contact Applicant"
                    >
                      <Mail size={16} />
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                          title="Delete Application"
                          disabled={isDeleting === application.id}
                        >
                          {isDeleting === application.id ? (
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
                            Delete Application
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete the application from "{application.name}"? This action cannot be undone and will permanently remove the application and associated CV file.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteApplication(application.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Application
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