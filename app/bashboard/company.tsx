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
import { createCompany } from "./actions";

export function CreateCompany() {
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
    await createCompany(data);
    form.reset();
    window.location.reload();
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
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
