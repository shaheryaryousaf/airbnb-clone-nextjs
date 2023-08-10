import Container from "@/components/Container";
import { safeListing, safeUser } from "../types";
import Heading from "@/components/Heading";

import ListingCard from "@/components/listings/ListingCard";

interface FavoritesClientProps {
  listings: safeListing[];
  currentUser: safeUser | null;
}

const FavoritesClient = ({ listings, currentUser }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing, index) => (
          <ListingCard key={index} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;