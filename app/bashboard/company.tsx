"use client";

import { companySchema, type companyData } from "./schema";
import { useForm } from "react-hook-form";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Form, FormControl, FormField, FormMessage, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCompany } from "./actions";
export function CreateCompany() {
    const form = useForm<companyData>({
        resolver: standardSchemaResolver,
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

    async function onSubmit(data: companyData) {
        await createCompany(data);
        form.reset()
        window.location.reload();
    }

    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field })} => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                        </FormItem>
                        <FormControl>
                            <Input
                                {...field}
                                placeholder="Enter company name"
                                error={!!form.formState.errors.name}
                            />
                            {form.formState.errors.name && (
                      <p className="text-sm text-red-600 mt-1">{form.formState.errors.name.message}</p>
                    )}
                        </FormControl>
                    )
                />
            </div>
        </form>
    </Form>
}