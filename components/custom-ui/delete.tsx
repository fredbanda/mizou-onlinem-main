"use client";

import {useState} from "react";

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DeleteProps {
  id: string
}

const Delete: React.FC<DeleteProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = async() => {
    try{
      setIsLoading(true)
     const res = await fetch(`/api/collections/${id}`,{
        method: "DELETE",
      });

      if(res.ok){
        window.location.href=("/dashboard/collections")
        toast.success("Collected was deleted successfully", {position: "top-right"})
      }
    } catch(error ) {
      console.log("[DELETE_ERROR]", error)
      toast.error("Something went wrong. Please try again later")
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          size="sm"
        >
          <Trash className="w-5 h-5" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white ">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
