"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, type applicationData } from "./schema";
import { submitApplication } from "./actions";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ApplicationFormProps {
  jobId: number;
  jobTitle: string;
  companyName: string;
}

export function ApplicationForm({ jobId, jobTitle, companyName }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<applicationData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      coverLetter: "",
    },
  });

  const onSubmit: SubmitHandler<applicationData> = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitApplication(jobId, data);

      if (result?.success) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-100"
    >
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
            <Send size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Apply for this Position</h3>
            <p className="text-slate-600">{jobTitle} at {companyName}</p>
          </div>
        </div>
        <p className="text-slate-600">
          Submit your application and we'll get back to you within 48 hours.
        </p>
      </div>

      {/* Success/Error Alerts */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert className="border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Thank you! Your application has been submitted successfully. We'll review it and get back to you soon.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Sorry, there was an error submitting your application. Please try again.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <User size={18} />
              Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Full Name *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700 font-medium">
                      Email Address *
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="0501234567"
                      className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <FileText size={18} />
              Documents
            </h4>

            <FormField
              control={form.control}
              name="resume"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Resume/CV *
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="file"
                        accept=".pdf"
                        className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        {...field}
                      />
                      <Upload size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    </div>
                  </FormControl>
                  <p className="text-xs text-slate-500">
                    Upload your resume in PDF format (max 5MB)
                  </p>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          {/* Cover Letter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <Mail size={18} />
              Cover Letter
            </h4>

            <FormField
              control={form.control}
              name="coverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Cover Letter (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                      className="min-h-32 border-slate-200 focus:border-teal-500 focus:ring-teal-500 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-sm" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-200">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Application...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send size={18} />
                  Submit Application
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
}