"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { JobFilters } from "./job-filters";
import { JobCard } from "./job-card";
import { Briefcase, Search } from "lucide-react";
import type { JobWithCompany } from "./actions";

interface JobsProps {
  initialJobs: JobWithCompany[];
}

export function Jobs({ initialJobs }: JobsProps) {
  const [jobs, setJobs] = useState<JobWithCompany[]>(initialJobs);
  const [filteredJobs, setFilteredJobs] = useState<JobWithCompany[]>(initialJobs);
  const [isLoading, setIsLoading] = useState(false);

  const handleFiltersChange = (filters: {
    search: string;
    location: string;
    type: string;
    category: string;
  }) => {
    setIsLoading(true);
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      let filtered = jobs;

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.company.name.toLowerCase().includes(searchTerm)
        );
      }

      // Location filter
      if (filters.location) {
        const locationTerm = filters.location.toLowerCase();
        filtered = filtered.filter(job =>
          job.location.toLowerCase().includes(locationTerm)
        );
      }

      // Type filter
      if (filters.type) {
        filtered = filtered.filter(job => job.type === filters.type);
      }

      // Category filter
      if (filters.category) {
        filtered = filtered.filter(job => job.category === filters.category);
      }

      setFilteredJobs(filtered);
      setIsLoading(false);
    }, 300);
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
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Dream <span className="text-amber-400">Job</span>
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Discover amazing career opportunities with top companies across Ghana and West Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="space-y-8">
            {/* Filters */}
            <JobFilters onFiltersChange={handleFiltersChange} />

            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <Briefcase size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {isLoading ? "Searching..." : `${filteredJobs.length} Jobs Found`}
                  </h2>
                  <p className="text-slate-600">
                    {isLoading ? "Finding the best matches for you..." : "Explore opportunities that match your skills"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Jobs Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 animate-pulse">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-32" />
                        <div className="h-3 bg-slate-200 rounded w-24" />
                      </div>
                    </div>
                    <div className="space-y-3 mb-4">
                      <div className="h-3 bg-slate-200 rounded w-full" />
                      <div className="h-3 bg-slate-200 rounded w-3/4" />
                      <div className="h-3 bg-slate-200 rounded w-1/2" />
                    </div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-slate-200 rounded w-16" />
                      <div className="h-6 bg-slate-200 rounded w-20" />
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 bg-slate-200 rounded flex-1" />
                      <div className="h-8 bg-slate-200 rounded w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">No Jobs Found</h3>
                <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                  We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}