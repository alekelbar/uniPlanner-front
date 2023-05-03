import { useRouter } from "next/router";
import { useEffect } from "react";
import { useStandarDialog } from "@/hooks/useStandarDialog";
import { useStandarFetch } from "@/hooks/useStandarFetch";
import { startLoadTasks } from "@/redux/thunks/tasks-thunks";
import { useAppDispatch } from "@/redux";
import { Task } from "@/interfaces/task-interface";
import { useStandarPagination } from "@/hooks/useStandartPagination";

export const useTasks = (ITEMS_PER_PAGE: number) => {
  const router = useRouter();
  const {
    query: { deliveryId },
  } = router;

  const dispatch = useAppDispatch();

  const { getData } = useStandarFetch(
    async () => await dispatch(startLoadTasks(deliveryId as string))
  );

  useEffect(() => {
    getData();
  }, []);

  const { getCurrentPageItems, beforeDelete, currentPage, handlePagination } =
    useStandarPagination<Task>(ITEMS_PER_PAGE);

  const {
    openCreate,
    openEdit,
    onCloseCreate,
    onOpenCreate,
    onCloseEdit,
    onOpenEdit,
    openClock,
    handleCloseClock,
    handleOpenClock,
  } = useStandarDialog();

  return {
    pagination: {
      getCurrentPageItems,
      beforeDelete,
      currentPage,
      handlePagination,
      ITEMS_PER_PAGE,
    },
    dialogHandler: {
      openClock,
      openCreate,
      openEdit,
      onCloseCreate,
      onCloseEdit,
      onOpenCreate,
      onOpenEdit,
      handleCloseClock,
      handleOpenClock,
    },
  };
};
