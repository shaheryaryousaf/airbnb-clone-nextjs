import prisma from "@/app/libs/prismadb";
import { safeReservation } from "../types";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeReservations = reservations
      .map((reservation) => {
        if (!reservation.listing?.id) {
          return null;
        }
        return {
          ...reservation,
          createdAt: reservation.createdAt.toISOString(),
          startDate: reservation.startDate.toISOString(),
          endDate: reservation.endDate.toISOString(),
          listing: {
            ...reservation.listing,
            id: reservation.listing.id,
            createdAt: reservation.listing?.createdAt.toDateString(),
          },
        };
      })
      .filter(Boolean) as safeReservation[];
    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
