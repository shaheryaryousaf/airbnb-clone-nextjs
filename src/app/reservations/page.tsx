import EmptyState from "@/components/EmptyState";

import { getCurrentUser } from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import ReservationsClient from "./ReservationsClient";

const Reservations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthroized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations!"
      />
    );
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
};

export default Reservations;
