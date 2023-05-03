import { Session } from "../../../interfaces/session-interface";
import { ChangeEvent } from "react";

export interface SessionContext {
  clock: {
    openClock: boolean;
    onOpenClock: () => void;
    onCloseClock: () => void;
  };
  pagination: {
    getCurrentPageItems: (items: Session[], currentPage: number) => Session[];
    beforeDelete: (items: Session[]) => void;
    currentPage: number;
    handlePagination: (_: ChangeEvent<unknown>, page: number) => void;
    ITEMS_PER_PAGE: number;
  };
  dialogHandler: {
    openCreate: boolean;
    onOpenCreate: () => void;
    onCloseCreate: () => void;
  };
}
