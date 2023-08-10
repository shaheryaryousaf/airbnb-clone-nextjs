"use client";
import { useState } from "react";

import Heading from "@/components/Heading";
import { safeUser, safeReservation } from "../types";

import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";

import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ReservationsClientProps {
  reservations: safeReservation[];
  currentUser?: safeUser | null;
}

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const router = useRouter();
  const [deletingid, setDeletingId] = useState("");

  const onCancel = (id: string) => {
    setDeletingId(id);

    axios
      .delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success("Reservation cancelled");
        router.refresh();
      })
      .catch((error) => toast.error(error?.response?.data?.error))
      .finally(() => setDeletingId(""));
  };
  return (
    <Container>
      <Heading title="Reservations" subtitle="Booking on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation, index) => (
          <ListingCard
            key={index}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingid === reservation.id}
            actionaLabel="Cancel Reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
