import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../src/redux/hooks";
import { startLoadCourses } from "../../../../src/redux/thunks/courses.thunks";
import { useStandarFetch } from "@/hooks/useStandarFetch";
import { useStandarDialog } from "@/hooks/useStandarDialog";
import { useStandarPagination } from "@/hooks/useStandartPagination";
import { Course } from "@/interfaces/course.interface";

export const useCourses = (ITEMS_PER_PAGE: number) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    query: { careerId },
  } = router;

  const { getData } = useStandarFetch(
    async () => await await dispatch(startLoadCourses(careerId as string))
  );

  useEffect(() => {
    getData();
  }, []);

  const { beforeDelete, currentPage, getCurrentPageItems, handlePagination } =
    useStandarPagination<Course>(ITEMS_PER_PAGE);

  const {
    openCreate,
    openEdit,
    onCloseCreate,
    onCloseEdit,
    onOpenEdit,
    onOpenCreate,
  } = useStandarDialog();

  return {
    pagination: {
      beforeDelete,
      currentPage,
      getCurrentPageItems,
      handlePagination,
      ITEMS_PER_PAGE,
    },
    dialogHandler: {
      openCreate,
      openEdit,
      onCloseCreate,
      onCloseEdit,
      onOpenEdit,
      onOpenCreate,
    },
  };
};
