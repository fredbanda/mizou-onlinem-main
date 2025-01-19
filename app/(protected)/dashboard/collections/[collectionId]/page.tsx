"use client";

import { CreateNewCollectionForm } from "@/components/collections/new-collection-form";
import { Loader } from "@/components/custom-ui/loader";
import { useEffect, useState } from "react";

const CollectionDetailsPage = ({ params }: { params: { collectionId: string } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      // Access `params` via `await` to ensure it's resolved
      const resolvedParams = await params;
      const res = await fetch(`/api/collections/${resolvedParams.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setIsLoading(false);
    } catch (error) {
      console.log("[COLLECTION_DETAILS_GET_ERROR]", error);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <CreateNewCollectionForm inittialData={collectionDetails} />
  );
};

export default CollectionDetailsPage;
