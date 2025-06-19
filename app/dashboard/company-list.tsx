"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Eye, Building2, Globe, Users as UsersIcon, AlertTriangle, Mail, MapPin, Calendar } from "lucide-react";
import { deleteCompany } from "./actions";
import { CompanyForm } from "./company";
import Image from "next/image";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Company {
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
}

interface CompanyListProps {
  companies: Company[];
}

export function CompanyList({ companies }: CompanyListProps) {
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [viewingCompany, setViewingCompany] = useState<Company | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(id);
    try {
      await deleteCompany(id);
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleView = (company: Company) => {
    setViewingCompany(company);
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
  };

  if (companies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 size={24} className="text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No companies found</h3>
        <p className="text-slate-600">Start by adding your first company.</p>
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
            All Companies ({companies.length})
          </h3>
          <p className="text-sm text-slate-600">
            Manage company profiles and information
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="font-semibold text-slate-700">Company</TableHead>
              <TableHead className="font-semibold text-slate-700">Location</TableHead>
              <TableHead className="font-semibold text-slate-700">Founded</TableHead>
              <TableHead className="font-semibold text-slate-700">Employees</TableHead>
              <TableHead className="font-semibold text-slate-700">Contact</TableHead>
              <TableHead className="font-semibold text-slate-700">Created</TableHead>
              <TableHead className="font-semibold text-slate-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company, index) => (
              <motion.tr
                key={company.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="hover:bg-slate-50 transition-colors"
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    {company.logo ? (
                      <Image
                        src={company.logo}
                        alt={company.name}
                        width={40}
                        height={40}
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                        <Building2 size={16} className="text-white" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{company.name}</p>
                      {company.description && (
                        <p className="text-sm text-slate-500 line-clamp-1 max-w-[200px]">
                          {company.description.substring(0, 50)}...
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-slate-400" />
                    <span className="text-slate-700">{company.location || "Not specified"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-slate-700">{company.founded || "N/A"}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UsersIcon size={14} className="text-slate-400" />
                    <span className="text-slate-700">{company.employees || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    {company.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail size={12} className="text-slate-400" />
                        <span className="text-slate-600">{company.email}</span>
                      </div>
                    )}
                    {company.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe size={12} className="text-slate-400" />
                        <a 
                          href={company.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:text-teal-700"
                        >
                          Website
                        </a>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar size={14} />
                    {formatDate(company.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleView(company)}
                          className="h-8 w-8 hover:bg-blue-50 hover:text-blue-600"
                          title="View Company Details"
                        >
                          <Eye size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3">
                            {company.logo ? (
                              <Image
                                src={company.logo}
                                alt={company.name}
                                width={48}
                                height={48}
                                className="rounded-xl object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
                                <Building2 size={20} className="text-white" />
                              </div>
                            )}
                            {company.name}
                          </DialogTitle>
                          <DialogDescription>
                            Company Profile Details
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          {company.description && (
                            <div>
                              <h4 className="font-semibold mb-2">Description</h4>
                              <p className="text-slate-600">{company.description}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Founded</h4>
                              <p className="text-slate-600">{company.founded || "Not specified"}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Employees</h4>
                              <p className="text-slate-600">{company.employees || "Not specified"}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Location</h4>
                              <p className="text-slate-600">{company.location || "Not specified"}</p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Created</h4>
                              <p className="text-slate-600">{formatDate(company.createdAt)}</p>
                            </div>
                          </div>
                          {(company.email || company.website) && (
                            <div>
                              <h4 className="font-semibold mb-2">Contact Information</h4>
                              <div className="space-y-2">
                                {company.email && (
                                  <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-slate-400" />
                                    <a href={`mailto:${company.email}`} className="text-teal-600 hover:text-teal-700">
                                      {company.email}
                                    </a>
                                  </div>
                                )}
                                {company.website && (
                                  <div className="flex items-center gap-2">
                                    <Globe size={16} className="text-slate-400" />
                                    <a 
                                      href={company.website} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-teal-600 hover:text-teal-700"
                                    >
                                      {company.website}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEdit(company)}
                          className="h-8 w-8 hover:bg-green-50 hover:text-green-600"
                          title="Edit Company"
                        >
                          <Edit size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Company</DialogTitle>
                          <DialogDescription>
                            Update company information for {company.name}
                          </DialogDescription>
                        </DialogHeader>
                        <CompanyForm initialData={company} />
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                          title="Delete Company"
                          disabled={isDeleting === company.id}
                        >
                          {isDeleting === company.id ? (
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
                            Delete Company
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{company.name}"? This action cannot be undone and will permanently remove the company and all associated job postings.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(company.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Delete Company
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