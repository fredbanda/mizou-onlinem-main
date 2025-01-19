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
import Delete from "../custom-ui/delete";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(500, { message: "Description is too long" })
    .trim(),
  image: z.string(),
});

interface CreateNewCollectionFormProps { 
  inittialData?: CollectionType | null
}


export const CreateNewCollectionForm: React.FC<CreateNewCollectionFormProps> = ({ inittialData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: inittialData ? inittialData : {
      title: "",
      description: "",
      image: "",
    },
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const url = inittialData ? `/api/collections/${inittialData._id}` : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setIsLoading(false);
        toast.success(`Collection  ${inittialData ? "updated" : "created"} successfully`, {
          position: "top-right",
        });
        window.location.href = "/dashboard/collections";
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
      {inittialData ? (
        <div className="flex items-center justify-between">
        <p className="text-heading2-bold">Edit Collection</p>
        <Delete id={inittialData._id} />
        </div>
      ):(
        <p className="text-heading2-bold">Create New Collection</p>
      )}
      
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
                      onKeyDown={handleKeyPress}
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
                      onKeyDown={handleKeyPress}
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
                onClick={() => router.push("/dashboard/collections")}
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
