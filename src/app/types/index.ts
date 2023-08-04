import { Listing, User } from "@prisma/client";

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string;
};

export type safeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};
