import EmptyState from "@/components/EmptyState";

import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ClientOnly from "@/components/ClientOnly";

import ReservationsClient from "./ReservationsClient";

const Reservations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthroized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations!"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default Reservations;
