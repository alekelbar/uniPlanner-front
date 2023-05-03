import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../redux";
import { startLoadSession } from "../../../redux/thunks/session-thunks";
import { useStandarDialog } from "@/hooks/useStandarDialog";
import { useStandarPagination } from "@/hooks/useStandartPagination";
import { useStandarFetch } from "@/hooks/useStandarFetch";
import { Session } from "@/interfaces/session-interface";

export const useSession = (ITEMS_PER_PAGE: number) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    query: { user },
  } = router;

  const { getData } = useStandarFetch(
    async () => await dispatch(startLoadSession(user as string))
  );

  useEffect(() => {
    getData();
  }, []);

  const { getCurrentPageItems, beforeDelete, currentPage, handlePagination } =
    useStandarPagination<Session>(ITEMS_PER_PAGE);

  const {
    handleOpenClock: onOpenClock,
    handleCloseClock: onCloseClock,
    openClock,
    openCreate,
    onOpenCreate,
    onCloseCreate,
  } = useStandarDialog();

  return {
    clock: {
      openClock,
      onOpenClock,
      onCloseClock,
    },
    pagination: {
      getCurrentPageItems,
      beforeDelete,
      currentPage,
      handlePagination,
      ITEMS_PER_PAGE,
    },
    dialogHandler: {
      openCreate,
      onOpenCreate,
      onCloseCreate,
    },
  };
};
