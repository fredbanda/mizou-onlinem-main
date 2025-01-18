"use client";

import { columns } from "@/components/collections/collection-columns";
import { DataTable } from "@/components/custom-ui/data-table";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const CollectionsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });

      const data = await res.json();

      setCollections(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[COLLECTIONS_GET_ERROR", error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  console.log(collections);

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold text-blue-900">Collections</p>
        <Link href="/dashboard/collections/new-collection">
        <Button className="bg-emerald-500 text-white font-bold ">
          <Plus className="w-5 h-5 mr-2" />
          Create A New Collection
        </Button>
        </Link>
      </div>
      <Separator className="my-4 bg-grey-1" />

      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default CollectionsPage;
