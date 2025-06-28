"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ApplicationList } from "./application-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import type { ApplicationWithJob } from "./actions";

interface JobApplicationsProps {
  jobId: number;
  jobTitle: string;
  applications: ApplicationWithJob[];
  onBack: () => void;
}

export function JobApplications({ jobId, jobTitle, applications, onBack }: JobApplicationsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back to Jobs
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Applications for {jobTitle}</h2>
            <p className="text-slate-600">{applications.length} applications received</p>
          </div>
        </div>
      </div>

      {/* Applications List */}
      <ApplicationList applications={applications} jobId={jobId} />
    </motion.div>
  );
}