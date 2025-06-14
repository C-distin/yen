"use client";

import { companySchema, type companyData } from "./schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCompany, updateCompany } from "./actions";
import { Button } from "@/components/ui/button";
import type { companies } from "@/lib/db/schema";
import { useState } from "react";

interface CompanyFormProps {
  initialData?: typeof companies.$inferSelect;
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<companyData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: initialData?.name || "",
      logo: initialData?.logo || "",
      description: initialData?.description || "",
      founded: initialData?.founded || "",
      location: initialData?.location || "",
      employees: initialData?.employees || "",
      website: initialData?.website || "",
    },
  });

  const onSubmit: SubmitHandler<companyData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Clean up the data - remove empty strings and convert to null where appropriate
      const cleanedData = {
        name: data.name,
        logo: data.logo || null,
        description: data.description || null,
        founded: data.founded || null,
        location: data.location || null,
        employees: data.employees || null,
        website: data.website || null,
      };

      if (initialData) {
        await updateCompany(initialData.id, cleanedData);
      } else {
        await createCompany(cleanedData);
      }
      
      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-green-800 font-medium">
              Company {initialData ? "updated" : "created"} successfully!
            </p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-red-800 font-medium">
              Failed to {initialData ? "update" : "create"} company. Please try again.
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Company Name <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company name"
                      {...field}
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Logo URL
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/logo.png"
                      {...field}
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of the company"
                    {...field}
                    className="h-24 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    rows={4}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="founded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Year Founded
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 2000"
                      {...field}
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Accra, Ghana"
                      {...field}
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="employees"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Number of Employees
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 100"
                      {...field}
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Website
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    {...field}
                    className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
          
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              className="flex-1 rounded-md bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 w-[50%] h-12"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-2 border-t-white border-white/30" />
                  {initialData ? "Updating..." : "Creating..."}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  {initialData ? "Update Company" : "Create Company"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}