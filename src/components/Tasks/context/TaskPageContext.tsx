import { ChangeEvent, createContext } from "react";
import { Task } from "../../../interfaces/task-interface";

interface TaskPageContext {
  pagination: {
    getCurrentPageItems: (items: Task[], currentPage: number) => Task[];
    beforeDelete: (items: Task[]) => void;
    currentPage: number;
    handlePagination: (_: ChangeEvent<unknown>, page: number) => void;
    ITEMS_PER_PAGE: number;
  };
  dialogHandler: {
    openClock: boolean;
    openCreate: boolean;
    openEdit: boolean;
    onCloseCreate: () => void;
    onCloseEdit: () => void;
    onOpenCreate: () => void;
    onOpenEdit: () => void;
    handleCloseClock: () => void;
    handleOpenClock: () => void;
  };
}

export const taskPageContext = createContext({} as TaskPageContext);
export const { Provider: TaskProvider } = taskPageContext;
