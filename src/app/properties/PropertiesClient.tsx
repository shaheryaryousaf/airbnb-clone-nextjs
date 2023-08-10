"use client";

import Heading from "@/components/Heading";
import { safeUser, safeListing } from "../types";

import Container from "@/components/Container";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface PropertiesClientProps {
  listings: safeListing[];
  currentUser?: safeUser | null;
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
  const router = useRouter();
  const [deletingid, setDeletingId] = useState("");

  const onCancel = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/listings/${id}`)
      .then(() => {
        toast.success("Listing Deleted");
        router.refresh();
      })
      .catch((error) => toast.error(error?.response?.data?.error))
      .finally(() => setDeletingId(""));
  };
  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing, index) => (
          <ListingCard
            key={index}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingid === listing.id}
            actionaLabel="Delete Property"
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
