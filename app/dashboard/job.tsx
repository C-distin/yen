"use client";

import { jobSchema, type jobData } from "./schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJob, updateJob } from "./actions";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { jobs, companies } from "@/lib/db/schema";

interface JobFormProps {
  initialData?: typeof jobs.$inferSelect & { company: string };
  companies: Array<{ id: number; name: string }>;
}

export function JobForm({ initialData, companies }: JobFormProps) {
  const form = useForm<jobData>({
    resolver: zodResolver(jobSchema),
    defaultValues: initialData || {
      title: "",
      companyId: 0,
      location: "",
      salary: "",
      type: "Full-time",
      category: "Other",
      description: "",
      requirements: "",
      benefits: "",
      featured: false,
    },
  });

  const onSubmit: SubmitHandler<jobData> = async (data) => {
    try {
      if (initialData) {
        await updateJob(initialData.id, data);
      } else {
        await createJob(data);
      }
      form.reset();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Job Title <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter job title"
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
            name="companyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Company <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500">
                      <SelectValue placeholder="Select a company" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem
                        key={company.id}
                        value={company.id.toString()}
                      >
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  Location <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Accra, Ghana"
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
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Salary
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="GHS 10,000"
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Job Type <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Remote">Remote</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Job Category <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a job category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Development">Development</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Administration">
                      Administration
                    </SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                    <SelectItem value="Production">Production</SelectItem>
                    <SelectItem value="Project Management">
                      Project Management
                    </SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                  </SelectContent>
                </Select>
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
                Description <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of the job"
                  {...field}
                  className="h-24 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  rows={4}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Requirements
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Requirements for the job"
                  {...field}
                  className="h-24 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  rows={4}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="benefits"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Benefits
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Benefits of the job"
                  {...field}
                  className="h-24 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  rows={4}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-slate-700 font-medium">
                  Featured
                </FormLabel>
                <FormMessage className="text-sm text-red-600" />
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex-1 rounded-md bg-teal-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-600 transition-all duration-300 w-[50%] h-12"
          disabled={form.formState.isSubmitting}
        >{initialData ? "Update Job" : "Create Job"}</Button>
      </form>
    </Form>
  );
}
