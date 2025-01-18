"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Trash } from "lucide-react";

import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
import { ImageUploader } from "../custom-ui/image-uploader";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description is too long" })
    .trim(),
  image: z.string(),
});

export const CreateNewCollectionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/collections", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setIsLoading(false);
        toast.success("Collection created successfully", {
          position: "top-right",
        });
        router.push("/dashboard/collections");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create New Collection</p>
      <Separator className="bg-grey-1  my-4 mb-7" />
      <div className="space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Wedding ring"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g.Golden ring with diamonds"
                      {...field}
                      rows={5}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUploader
                      value={field.value ? [field.value] : []}
                      onChange={(url) => {
                        // Delay state update to avoid triggering it during rendering
                        setTimeout(() => field.onChange(url), 0);
                      }}
                      onRemove={() => {
                        // Delay state update to avoid triggering it during rendering
                        setTimeout(() => field.onChange(""), 0);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-4">
              <Button
                variant="default"
                type="submit"
                className="bg-blue-800 text-white w-1/3 mr-4"
              >
                Submit
              </Button>
              <Button
                type="button"
                className="bg-red-600 text-white w-1/3"
                onClick={() => router.push("/collections")}
              >
                <Trash />
                Discard?
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
