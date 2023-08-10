import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";

import getListings, { IListingsParams } from "./actions/getListings";
import { getCurrentUser } from "./actions/getCurrentUser";

import ListingCard from "@/components/listings/ListingCard";

import ClientOnly from "@/components/ClientOnly";

interface HomeProps {
  searchParams: IListingsParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const currentUser = await getCurrentUser();
  const listings = await getListings(searchParams);

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl: grid:cols-8 gap-8">
          {listings.map((listing, index) => (
            <ListingCard key={index} data={listing} currentUser={currentUser} />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
