"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobList } from "./job-list";
import { CompanyList } from "./company-list";
import { ApplicationList } from "./application-list";
import { Analytics } from "./analytics";
import { CompanyForm } from "./company";
import { JobForm } from "./job";
import { 
  BarChart3, 
  Building2, 
  Briefcase, 
  Plus,
  Users,
  TrendingUp,
  FileText
} from "lucide-react";
import type { ApplicationWithJob } from "./actions";

interface DashboardProps {
  jobs: Array<{
    id: number;
    title: string;
    companyId: number;
    location: string;
    salary: string | null;
    type: string;
    category: string;
    description: string;
    requirements: string;
    benefits: string;
    featured: boolean;
    postedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    company: {
      id: number;
      name: string;
      logo: string | null;
      location: string | null;
    };
  }>;
  companies: Array<{
    id: number;
    name: string;
    location: string | null;
    featured: boolean;
    logo: string | null;
    description: string | null;
    founded: string | null;
    employees: string | null;
    website: string | null;
    email: string | null;
    createdAt: Date;
    updatedAt: Date;
  }>;
  applications: ApplicationWithJob[];
  analytics: {
    totalJobs: number;
    totalCompanies: number;
    totalApplications: number;
  };
}

export function Dashboard({ jobs, companies, applications, analytics }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("analytics");

  const tabItems = [
    {
      value: "analytics",
      label: "Analytics",
      icon: BarChart3,
      description: "View performance metrics"
    },
    {
      value: "jobs",
      label: "Job Listings",
      icon: Briefcase,
      description: "Manage job postings"
    },
    {
      value: "jobForm",
      label: "Create Job",
      icon: Plus,
      description: "Add new job posting"
    },
    {
      value: "companies",
      label: "Companies",
      icon: Building2,
      description: "Manage companies"
    },
    {
      value: "companyForm",
      label: "Create Company",
      icon: Users,
      description: "Add new company"
    },
    {
      value: "applications",
      label: "Applications",
      icon: FileText,
      description: "View job applications"
    }
  ];

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
              Admin <span className="text-amber-400">Dashboard</span>
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Manage your job postings, companies, applications, and track performance metrics
              all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
              {/* Custom Tab Navigation */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Dashboard Navigation
                  </h2>
                  <p className="text-slate-600">
                    Select a section to manage your job center operations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                  {tabItems.map((item, index) => (
                    <motion.button
                      key={item.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      onClick={() => setActiveTab(item.value)}
                      className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                        activeTab === item.value
                          ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white border-teal-500 shadow-lg"
                          : "bg-white text-slate-700 border-slate-200 hover:border-teal-300 hover:bg-teal-50"
                      }`}
                    >
                      <div className="flex flex-col items-center text-center space-y-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          activeTab === item.value
                            ? "bg-white/20"
                            : "bg-gradient-to-r from-teal-500 to-teal-600 text-white group-hover:scale-110"
                        }`}>
                          <item.icon size={20} className={activeTab === item.value ? "text-white" : ""} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm mb-1">{item.label}</h3>
                          <p className={`text-xs ${
                            activeTab === item.value ? "text-teal-100" : "text-slate-500"
                          }`}>
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {activeTab === item.value && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-2xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden"
              >
                <TabsContent value="analytics" className="p-8 space-y-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <TrendingUp size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Analytics Overview</h3>
                        <p className="text-slate-600">Track your platform's performance metrics</p>
                      </div>
                    </div>
                  </div>
                  <Analytics {...analytics} />
                </TabsContent>

                <TabsContent value="jobs" className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Briefcase size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Job Listings</h3>
                        <p className="text-slate-600">Manage all job postings on your platform</p>
                      </div>
                    </div>
                  </div>
                  <JobList jobs={jobs} companies={companies} />
                </TabsContent>

                <TabsContent value="companies" className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Building2 size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Companies</h3>
                        <p className="text-slate-600">Manage company profiles and information</p>
                      </div>
                    </div>
                  </div>
                  <CompanyList companies={companies} />
                </TabsContent>

                <TabsContent value="applications" className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <FileText size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Job Applications</h3>
                        <p className="text-slate-600">View and manage all job applications</p>
                      </div>
                    </div>
                  </div>
                  <ApplicationList applications={applications} />
                </TabsContent>

                <TabsContent value="jobForm" className="p-0">
                  <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Plus size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Create New Job</h3>
                        <p className="text-slate-600">Add a new job posting to your platform</p>
                      </div>
                    </div>
                  </div>
                  <JobForm companies={companies} />
                </TabsContent>

                <TabsContent value="companyForm" className="p-0">
                  <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                        <Users size={20} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">Create New Company</h3>
                        <p className="text-slate-600">Add a new company to your platform</p>
                      </div>
                    </div>
                  </div>
                  <CompanyForm />
                </TabsContent>
              </motion.div>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </div>
  );
}