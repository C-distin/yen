"use client";

import { motion } from "motion/react";
import {
  Users,
  Target,
  Award,
  Heart,
  Briefcase,
  TrendingUp,
  Globe,
  Shield,
  Star,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface StatCardProps {
  number: string;
  label: string;
}

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export function About() {
  const values: ValueCardProps[] = [
    {
      icon: Heart,
      title: "People First",
      description:
        "We believe that great businesses are built by great people. Every decision we make puts people at the center.",
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description:
        "We build lasting relationships through transparency, honesty, and consistent delivery on our promises.",
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description:
        "We're committed to continuous learning and helping both job seekers and employers reach their full potential.",
    },
    {
      icon: Globe,
      title: "Global Vision",
      description:
        "While rooted in Ghana, we think globally, connecting talent across borders and cultures.",
    },
  ];

  const stats: StatCardProps[] = [
    { number: "5,000+", label: "Job Seekers Placed" },
    { number: "500+", label: "Partner Companies" },
    { number: "95%", label: "Client Satisfaction" },
    { number: "50+", label: "Industries Served" },
  ];

  const teamMembers: TeamMemberProps[] = [
    {
      name: "Kwame Asante",
      role: "Founder & CEO",
      image: "/api/placeholder/300/300",
      bio: "With over 15 years in talent acquisition, Kwame founded YenDaakye to bridge the gap between exceptional talent and forward-thinking companies.",
    },
    {
      name: "Ama Osei",
      role: "Head of Operations",
      image: "/api/placeholder/300/300",
      bio: "Ama brings a decade of operational excellence, ensuring our processes are efficient and our service delivery is world-class.",
    },
    {
      name: "Kofi Mensah",
      role: "Technology Director",
      image: "/api/placeholder/300/300",
      bio: "Kofi leads our technical innovation, building the platforms that power seamless connections between talent and opportunity.",
    },
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
              About <span className="text-amber-400">YenDaakye</span>
            </h1>
            <p className="text-xl md:text-2xl text-teal-100 max-w-4xl mx-auto leading-relaxed">
              Connecting exceptional talent with visionary companies across
              Ghana and beyond. We're more than a recruitment agency – we're
              your partners in building the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  To empower individuals and organizations by creating
                  meaningful connections that drive success, growth, and
                  positive change in communities across Ghana and West Africa.
                </p>
                <div className="flex items-center gap-3 text-teal-600">
                  <Target size={24} />
                  <span className="font-medium">
                    Connecting talent with opportunity
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-4">
                  <Award size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To be the leading talent solutions partner in West Africa,
                  known for our integrity, innovation, and impact in
                  transforming careers and building exceptional teams.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-700">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-teal-100">
              Measurable results that speak to our commitment
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-teal-100 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              These principles guide everything we do and shape how we serve our
              clients, candidates, and community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100 h-full">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-4">
                      <value.icon size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Experienced professionals passionate about connecting talent with
              opportunity and driving positive change in the recruitment
              industry.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100">
                  <div className="text-center mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <Users size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-teal-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-6"
            >
              <p>
                YenDaakye was born from a simple yet powerful observation:
                exceptional talent and forward-thinking companies often struggle
                to find each other. Founded in 2020 in the heart of Accra, we
                set out to bridge this gap with a human-centered approach to
                recruitment.
              </p>

              <p>
                Our name, "YenDaakye," reflects our core belief in bringing
                people together. In our local language, it means "we are one" –
                a philosophy that drives our commitment to creating meaningful
                connections that benefit individuals, organizations, and
                communities alike.
              </p>

              <p>
                What started as a small team with big dreams has grown into a
                trusted partner for companies across Ghana and West Africa.
                We've helped place thousands of professionals in roles where
                they can thrive, and we've supported hundreds of companies in
                building teams that drive real impact.
              </p>

              <p>
                Today, we continue to innovate and expand our services, always
                staying true to our founding principles: integrity, excellence,
                and the belief that the right connection can change everything.
              </p>
            </motion.div>
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
              Ready to Connect?
            </h2>
            <p className="text-xl text-teal-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you're looking for your next career opportunity or seeking
              exceptional talent for your team, we're here to help you succeed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-teal-700 hover:bg-teal-50 font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Briefcase size={18} className="mr-2" />
                Find Jobs
                <ChevronRight size={16} className="ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-teal-700 font-medium px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Users size={18} className="mr-2" />
                Hire Talent
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
