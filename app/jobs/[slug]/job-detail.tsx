"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApplicationForm } from "./application-form";
import {
  MapPin,
  Calendar,
  Building2,
  DollarSign,
  Star,
  Users,
  Globe,
  Clock,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import type { JobWithCompany } from "../actions";

interface JobDetailProps {
  job: JobWithCompany;
}

export function JobDetail({ job }: JobDetailProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'Full-time': 'bg-green-100 text-green-800 border-green-200',
      'Part-time': 'bg-blue-100 text-blue-800 border-blue-200',
      'Contract': 'bg-orange-100 text-orange-800 border-orange-200',
      'Internship': 'bg-purple-100 text-purple-800 border-purple-200',
      'Remote': 'bg-teal-100 text-teal-800 border-teal-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatRequirements = (requirements: string) => {
    return requirements.split('\n').filter(req => req.trim() !== '');
  };

  const formatBenefits = (benefits: string) => {
    return benefits.split('\n').filter(benefit => benefit.trim() !== '');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-teal-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Back Button */}
            <Link href="/jobs">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-700 mb-6"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Jobs
              </Button>
            </Link>

            {/* Job Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <Building2 size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    {job.title}
                  </h1>
                  <p className="text-xl text-teal-100">{job.company.name}</p>
                </div>
              </div>

              {job.featured && (
                <div className="flex items-center gap-2 bg-amber-400 text-slate-900 px-4 py-2 rounded-full font-medium">
                  <Star size={16} className="fill-current" />
                  Featured
                </div>
              )}
            </div>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-6 text-teal-100">
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>Posted {formatDate(job.postedAt)}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-2">
                  <DollarSign size={18} />
                  <span>{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <Badge className={`${getTypeColor(job.type)} border`}>
                  {job.type}
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Job Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Job Description</h2>
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              </motion.div>

              {/* Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h2>
                <ul className="space-y-3">
                  {formatRequirements(job.requirements).map((requirement, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-teal-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Benefits & Perks</h2>
                <ul className="space-y-3">
                  {formatBenefits(job.benefits).map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Company Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">About the Company</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                      <Building2 size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{job.company.name}</h4>
                      <p className="text-sm text-slate-600">{job.company.location}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin size={14} />
                      <span>{job.company.location || "Location not specified"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Users size={14} />
                      <span>Company Profile</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Job Categories */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-4">Job Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Category</span>
                    <Badge variant="outline">{job.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Type</span>
                    <Badge className={`${getTypeColor(job.type)} border`}>
                      {job.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Posted</span>
                    <span className="text-sm text-slate-600">{formatDate(job.postedAt)}</span>
                  </div>
                </div>
              </motion.div>

              {/* Application Form */}
              <ApplicationForm 
                jobId={job.id} 
                jobTitle={job.title} 
                companyName={job.company.name} 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}