import { ChangeEvent, createContext } from "react";
import { Deliverable } from "../../../interfaces/deliveries.interface";

export interface DeliveryPageContext {
  viewHandler: {
    handleToggleGrid: () => void;
    grid: boolean;
  },
  pagination: {
    getCurrentPageItems: (
      items: Deliverable[],
      currentPage: number
    ) => Deliverable[];
    beforeDelete: (items: Deliverable[]) => void;
    currentPage: number;
    handlePagination: (_: ChangeEvent<unknown>, page: number) => void;
    ITEMS_PER_PAGE: number;
  };
  dialogHandler: {
    openCreate: boolean;
    openEdit: boolean;
    onCloseCreate: () => void;
    onOpenCreate: () => void;
    onCloseEdit: () => void;
    onOpenEdit: () => void;
  };
}

export const deliveryPageContext = createContext({} as DeliveryPageContext);
export const { Provider: DeliveryProvider } = deliveryPageContext;
