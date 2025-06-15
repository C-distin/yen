"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Calendar, 
  Building2, 
  DollarSign,
  Star,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image"
import type { JobWithCompany } from "./actions";

interface JobCardProps {
  job: JobWithCompany;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="group"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Building2 size={20} className="text-white" />
            </div> */}
            {job.company.logo ? (
              <Image
                src={job.company.logo}
                alt={job.company.name}
                width={32}
                height={32}
                className="rounded-xl"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building2 size={20} className="text-white" />
              </div>
            )}
            <div>
              <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                {job.title}
              </h3>
              <p className="text-sm text-slate-600">{job.company.name}</p>
            </div>
          </div>
          
          {job.featured && (
            <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
              <Star size={12} className="fill-current" />
              Featured
            </div>
          )}
        </div>

        {/* Job Details */}
        <div className="space-y-3 mb-4 flex-1">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={14} />
            <span>{job.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Calendar size={14} />
            <span>Posted {formatDate(job.postedAt)}</span>
          </div>

          {job.salary && (
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <DollarSign size={14} />
              <span>{job.salary}</span>
            </div>
          )}

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={`${getTypeColor(job.type)} border`}>
            {job.type}
          </Badge>
          <Badge variant="outline" className="text-slate-600">
            {job.category}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-slate-100">
          <Link href={`/jobs/${job.id}`} className="flex-1">
            <Button 
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
              size="sm"
            >
              Apply Now
              <ExternalLink size={14} className="ml-2" />
            </Button>
          </Link>
          <Link href={`/jobs/${job.id}`}>
            <Button 
              variant="outline" 
              size="sm"
              className="border-slate-200 hover:border-teal-300 hover:bg-teal-50"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}