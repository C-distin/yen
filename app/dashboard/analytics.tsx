import { motion } from "motion/react";
import { Card } from "@/components/ui/card";
import { TrendingUp, Building2, Briefcase, Users, FileText } from "lucide-react";

interface AnalyticsProps {
  totalJobs: number;
  totalCompanies: number;
  totalApplications: number;
}

export function Analytics({ totalJobs, totalCompanies, totalApplications }: AnalyticsProps) {
  const stats = [
    {
      title: "Total Jobs",
      value: totalJobs,
      icon: Briefcase,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Total Companies",
      value: totalCompanies,
      icon: Building2,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Total Applications",
      value: totalApplications,
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Active Listings",
      value: totalJobs,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 * index }}
          className="group"
        >
          <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon size={20} className={stat.textColor} />
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color}`} />
                <span className="text-slate-500">Active this month</span>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}