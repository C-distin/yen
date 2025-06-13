"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JobFiltersProps {
  onFiltersChange: (filters: {
    search: string;
    location: string;
    type: string;
    category: string;
  }) => void;
}

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Remote"
];

const jobCategories = [
  "Technology",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Engineering",
  "Sales",
  "HR",
  "Design",
  "Operations",
  "Research",
  "Administration",
];

export function JobFilters({ onFiltersChange }: JobFiltersProps) {
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    type: "",
    category: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: "",
      location: "",
      type: "",
      category: "",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100"
    >
      <div className="space-y-6">
        {/* Main Search */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search jobs, companies, or keywords..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-12 h-14 text-base border-slate-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        {/* Quick Location Search */}
        <div className="relative">
          <MapPin size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Location (e.g., Accra, Kumasi, Remote)"
            value={filters.location}
            onChange={(e) => updateFilters({ location: e.target.value })}
            className="pl-12 h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter size={16} />
            Advanced Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="flex items-center gap-2 text-slate-600 hover:text-red-600"
            >
              <X size={16} />
              Clear All
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Job Type
              </label>
              <Select
                value={filters.type}
                onValueChange={(value) => updateFilters({ type: value })}
              >
                <SelectTrigger className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500">
                  <SelectValue placeholder="Select job type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Category
              </label>
              <Select
                value={filters.category}
                onValueChange={(value) => updateFilters({ category: value })}
              >
                <SelectTrigger className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {jobCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}