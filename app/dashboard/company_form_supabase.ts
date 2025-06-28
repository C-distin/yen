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
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanyFormProps {
  initialData?: typeof companies.$inferSelect;
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });
  
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.logo || null
  );
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<companyData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      founded: initialData?.founded || "",
      location: initialData?.location || "",
      employees: initialData?.employees || "",
      website: initialData?.website || "",
      email: initialData?.email || "",
    },
  });

  const handleLogoChange = (file: File | undefined) => {
    if (file) {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setSubmitStatus({
          type: "error",
          message: "Logo file size must be less than 5MB"
        });
        return;
      }

      // Validate file type
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setSubmitStatus({
          type: "error",
          message: "Logo must be a JPG or PNG image"
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear any previous error messages
      setSubmitStatus({ type: "idle" });
    } else {
      setLogoPreview(initialData?.logo || null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      form.setValue("logo", file);
      handleLogoChange(file);
    }
  };

  const handleRemoveLogo = () => {
    form.setValue("logo", undefined);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<companyData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: "idle" });

    try {
      // Clean up the data - remove empty strings and convert to null where appropriate
      const cleanedData = {
        name: data.name.trim(),
        logo: data.logo || null,
        description: data.description?.trim() || null,
        founded: data.founded?.trim() || null,
        location: data.location?.trim() || null,
        employees: data.employees?.trim() || null,
        website: data.website?.trim() || null,
        email: data.email?.trim() || null,
      };

      let result;
      if (initialData) {
        result = await updateCompany(initialData.id, cleanedData);
      } else {
        result = await createCompany(cleanedData);
      }
      
      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message || `Company ${initialData ? "updated" : "created"} successfully!`
        });
        
        if (!initialData) {
          form.reset();
          setLogoPreview(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message || `Failed to ${initialData ? "update" : "create"} company`
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An unexpected error occurred"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Messages */}
      {submitStatus.type === "success" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              {submitStatus.message}
            </p>
          </div>
        </div>
      )}

      {submitStatus.type === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-red-800 font-medium">
              {submitStatus.message}
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="company@example.com"
                      {...field}
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-600" />
                </FormItem>
              )}
            />
          </div>

          {/* Logo Upload */}
          <FormField
            control={form.control}
            name="logo"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Company Logo
                </FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    {/* Drop Zone */}
                    <div
                      className={cn(
                        "relative border-2 border-dashed rounded-lg p-6 transition-colors",
                        isDragOver 
                          ? "border-teal-500 bg-teal-50" 
                          : "border-slate-300 hover:border-slate-400",
                        "cursor-pointer"
                      )}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file);
                          handleLogoChange(file);
                        }}
                        {...field}
                      />
                      
                      {logoPreview ? (
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 border border-slate-200 rounded-xl overflow-hidden">
                            <img
                              src={logoPreview}
                              alt="Logo preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">Logo uploaded</p>
                            <p className="text-xs text-slate-500">Click to change or drag a new image</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveLogo();
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center">
                            <Upload className="w-6 h-6 text-slate-400" />
                          </div>
                          <p className="text-sm font-medium text-slate-700 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-slate-500">
                            PNG, JPG up to 5MB
                          </p>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-500">
                      Upload a company logo in JPG or PNG format. Maximum file size is 5MB.
                    </p>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
          
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