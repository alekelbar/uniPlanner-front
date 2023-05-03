import { ChangeEvent, createContext } from "react";
import { Course } from "../../../../src/interfaces/course.interface";

interface CoursePageContext {
  pagination: {
    beforeDelete: (items: Course[]) => void;
    currentPage: number;
    getCurrentPageItems: (items: Course[], currentPage: number) => Course[];
    handlePagination: (_: ChangeEvent<unknown>, page: number) => void;
    ITEMS_PER_PAGE: number
  };
  dialogHandler: {
    openCreate: boolean;
    openEdit: boolean;
    onCloseCreate: VoidFunction;
    onCloseEdit: VoidFunction;
    onOpenEdit: VoidFunction;
    onOpenCreate: VoidFunction;
  };
}
export const coursePageContext = createContext({} as CoursePageContext);
export const { Provider: CourseProvider } = coursePageContext;
