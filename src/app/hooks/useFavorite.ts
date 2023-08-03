import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-hot-toast";
import { safeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavotite {
  listingId: string;
  currentUser?: safeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavotite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return { hasFavorite, toggleFavorite };
};

export default useFavorite;
