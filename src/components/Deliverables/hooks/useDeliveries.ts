import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux";
import { startLoadDeliveries } from "@/redux/thunks/deliverables-thunks";
import { useRouter } from "next/router";
import { useStandarPagination } from "@/hooks/useStandartPagination";
import { Deliverable } from "@/interfaces/deliveries.interface";
import { useStandarDialog } from "@/hooks/useStandarDialog";
import { useStandarFetch } from "@/hooks/useStandarFetch";

export const useDeliveries = (ITEMS_PER_PAGE: number) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    query: { courseId },
  } = router;

  const cb = useCallback(
    async () => await dispatch(startLoadDeliveries(courseId as string)),
    [courseId]
  );

  const { getData } = useStandarFetch(cb);

  useEffect(() => {
    getData();
  }, [getData]);

  const { getCurrentPageItems, beforeDelete, currentPage, handlePagination } =
    useStandarPagination<Deliverable>(ITEMS_PER_PAGE);

  const {
    openCreate,
    openEdit,
    onCloseCreate,
    onOpenCreate,
    onCloseEdit,
    onOpenEdit,
  } = useStandarDialog();

  const [grid, setGrid] = useState(true);

  const handleToggleGrid = () => {
    setGrid(e => !e);
  }

  return {
    viewHandler: {
      handleToggleGrid,
      grid
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
      openEdit,
      onCloseCreate,
      onOpenCreate,
      onCloseEdit,
      onOpenEdit,
    },
  };
};
