import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/components/EmptyState";

import ListingClient from "./ListingClient";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

interface iParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: iParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
