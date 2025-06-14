"use client";

import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Briefcase,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  Building2,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { JobWithCompany } from "@/app/jobs/actions";

interface HomeProps {
  featuredJobs: JobWithCompany[];
  stats: {
    totalJobs: number;
    totalCompanies: number;
  };
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  label: string;
  icon: LucideIcon;
}

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

export function Home({ featuredJobs, stats }: HomeProps) {
  const features: FeatureCardProps[] = [
    {
      icon: Search,
      title: "Smart Job Matching",
      description: "Our AI-powered system matches you with jobs that fit your skills, experience, and career goals perfectly.",
    },
    {
      icon: Users,
      title: "Trusted Network",
      description: "Connect with verified employers and top companies across Ghana and West Africa.",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Access resources, training, and opportunities to advance your career and reach new heights.",
    },
  ];

  const statsData: StatCardProps[] = [
    {
      number: stats.totalJobs.toString() + "+",
      label: "Active Jobs",
      icon: Briefcase,
    },
    {
      number: stats.totalCompanies.toString() + "+",
      label: "Partner Companies",
      icon: Building2,
    },
    {
      number: "5,000+",
      label: "Success Stories",
      icon: Users,
    },
    {
      number: "95%",
      label: "Satisfaction Rate",
      icon: Star,
    },
  ];

  const testimonials: TestimonialProps[] = [
    {
      name: "Akosua Mensah",
      role: "Software Engineer",
      company: "Tech Solutions Ghana",
      content: "YenDaakye helped me find my dream job in tech. The process was smooth and the team was incredibly supportive throughout.",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Kwame Asante",
      role: "Marketing Manager",
      company: "Digital Marketing Pro",
      content: "I found multiple opportunities through YenDaakye. The platform made it easy to connect with top employers in my field.",
      image: "/api/placeholder/100/100",
    },
    {
      name: "Ama Osei",
      role: "Financial Analyst",
      company: "Ghana Finance Corp",
      content: "The personalized job recommendations were spot-on. I landed a role that perfectly matched my skills and aspirations.",
      image: "/api/placeholder/100/100",
    },
  ];

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-r from-teal-600 to-teal-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto max-w-7xl px-4 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                  Find Your Dream{" "}
                  <span className="text-amber-400">Career</span>
                </h1>
                <p className="text-xl md:text-2xl text-teal-100 leading-relaxed mb-8">
                  Connect with top employers across Ghana and West Africa. 
                  Discover opportunities that match your skills and ambitions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/jobs">
                  <Button
                    size="lg"
                    className="bg-white text-teal-700 hover:bg-teal-50 font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg text-lg"
                  >
                    <Search size={20} className="mr-2" />
                    Find Jobs
                    <ChevronRight size={18} className="ml-2" />
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-grey-400 hover:bg-white hover:text-teal-700 font-medium px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 text-lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center">
                      <TrendingUp size={24} className="text-slate-900" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Quick Stats</h3>
                      <p className="text-teal-100">Live platform metrics</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">{stats.totalJobs}+</div>
                      <div className="text-sm text-teal-100">Active Jobs</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-amber-400">{stats.totalCompanies}+</div>
                      <div className="text-sm text-teal-100">Companies</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={24} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Why Choose YenDaakye?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We're more than just a job board. We're your partner in building a successful career.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      {featuredJobs.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Featured Opportunities
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Discover hand-picked job opportunities from top companies looking for talented professionals.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredJobs.slice(0, 6).map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Building2 size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-sm text-slate-600">{job.company.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                        <Star size={12} className="fill-current" />
                        Featured
                      </div>
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

                      <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
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
                      <Button 
                        className="flex-1 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white"
                        size="sm"
                      >
                        Apply Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-slate-200 hover:border-teal-300 hover:bg-teal-50"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-center"
            >
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View All Jobs
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Hear from professionals who found their dream careers through YenDaakye.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                      <p className="text-xs text-teal-600">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-1 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join thousands of professionals who have found their dream careers through YenDaakye. 
              Your next opportunity is just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/jobs">
                <Button
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-teal-50 font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Search size={18} className="mr-2" />
                  Browse Jobs
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-700 font-medium px-8 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                >
                  <Users size={18} className="mr-2" />
                  Get Started
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}