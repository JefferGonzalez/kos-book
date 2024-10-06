"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UploadProject, UploadProjectSchema } from "@/schemas/docs";
import { CreateProject } from "@/server/actions/docs";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import "@/styles/Button.css";

export default function UploadForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<UploadProject>({
    resolver: zodResolver(UploadProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      file: undefined,
    },
  });

  const onSubmit = async (data: UploadProject) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description ?? "");
      formData.append("file", data.file);

      const response = await CreateProject(formData);

      if (response.error) {
        if (Array.isArray(response.error)) {
          for (const error of response.error) {
            const name = error.field as keyof UploadProject;

            form.setError(name, { message: error.message });
          }
        }

        if (typeof response.error === "string") {
          toast.error(response.error);
        }

        setLoading(false);
        return;
      }

      const projectId = response.data?.id;

      if (!projectId) {
        toast.error("An error occurred while creating the project.");
      }

      toast.success("Project created successfully.", {
        description: "You will be redirected to the preview page.",
        duration: 1000,
      });

      setTimeout(() => {
        router.push(`/dashboard/preview/${projectId}`);
      }, 1000);

      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while creating the project.");
    }
  };

  return (
    <Form {...form}>
      <form
        className="bg-white shadow-lg rounded-lg px-10 py-8 mb-6 w-full max-w-lg mx-auto"
        method="post"
        encType="multipart/form-data"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Upload your code
        </h2>

        <div className="mb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                  Project&apos;s name:
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Write the name of the project"
                    className="bg-gray-50 shadow-inner border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>

                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="mb-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="block text-gray-700 text-sm font-bold mb-2">
                  Description (optional):
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write the project description"
                    className="bg-gray-50 shadow-inner border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
                    rows={4}
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mb-6">
          <FormField
            name="file"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="w-full">
                <FormLabel className="block text-gray-900 text-sm font-bold">
                  Code
                </FormLabel>
                <FormControl>
                  <Input
                    id="file"
                    type="file"
                    accept=".zip"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) field.onChange(file);
                    }}
                    disabled={loading}
                  />
                </FormControl>
                <label
                  id="file-name"
                  htmlFor="file"
                  className="bg-blue-50 text-blue-700 border border-gray-300 rounded-lg cursor-pointer py-2 px-4 inline-flex items-center transition duration-200 hover:bg-blue-100"
                >
                  Choose file
                </label>
                <FormMessage>{fieldState.error?.message}</FormMessage>
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            className="button button_upload"
            disabled={loading}
            type="submit"
          >
            {loading && (
              <LoaderIcon className="transition-all duration-1000 animate-spin" />
            )}
            Save
          </button>
        </div>
      </form>
    </Form>
  );
}
