import React, { ChangeEvent } from "react";

export const useStandarPagination = <T>(ITEMS_PER_PAGE: number) => {
  // PaginationLogic
  const getCurrentPageItems = (items: T[], currentPage: number) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return items.slice(startIndex, endIndex);
  };

  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePagination = (_: ChangeEvent<unknown>, page: number) => {
     window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  const beforeDelete = (items: T[]) => {
    const lastItemIndex = currentPage * ITEMS_PER_PAGE - 1;
    if (lastItemIndex >= items.length) {
      // La página actual queda vacía, volver a la página anterior
      setCurrentPage(currentPage - 1 >= 1 ? currentPage - 1 : currentPage); // Evitar caer en la pagina cero
    }
  };
  // PaginationLogic

  return {
    getCurrentPageItems,
    beforeDelete,
    handlePagination,
    currentPage,
  };
};
