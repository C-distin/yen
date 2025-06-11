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

interface CompanyFormProps {
  initialData?: typeof companies.$inferSelect;
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const form = useForm<companyData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      logo: "",
      description: "",
      founded: "",
      location: "",
      employees: "",
      website: "",
    },
  });

  const onSubmit: SubmitHandler<companyData> = async (data) => {
    try {
      if (initialData) {
        await updateCompany(initialData.id, data);
      } else {
        await createCompany(data);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-700 font-medium">
                  Name *
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
                  Logo
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
                    placeholder="eg. 2000"
                    {...field}
                    className="h-12 border-slate-200 focus:border-teal-500 focus:ring-teal-500"
                  />
                </FormControl>
                \
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
                    placeholder="eg. Accra, Ghana"
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
                    placeholder="eg. 100"
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
            className="flex-1 rounded-md bg-teal-500 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-teal-600 transition-all duration-300 w-[50%] h-12"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-2 border-t-white border-white/30" />
                Creating...
              </div>
            ) : (
              <div className="flex items-center gap-2">Create Company</div>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
