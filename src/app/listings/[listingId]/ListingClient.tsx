"use client";

import { safeListing, safeUser } from "@/app/types";
import Container from "@/components/Container";
import { categories } from "@/components/navbar/Categories";
import { Reservation } from "@prisma/client";
import { useMemo } from "react";

import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";

interface ListingClientProps {
  reservation?: Reservation[];
  listing: safeListing & {
    user: safeUser;
  };
  currentUser: safeUser | null;
}

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
