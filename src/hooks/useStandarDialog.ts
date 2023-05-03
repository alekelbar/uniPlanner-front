import React from "react";

export const useStandarDialog = () => {
  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = React.useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const onOpenEdit = () => {
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const [openClock, setOpenClock] = React.useState(false);

  const handleCloseClock = () => {
    setOpenClock(false);
  };

  const handleOpenClock = () => {
    setOpenClock(true);
  };

  return {
    openCreate,
    openEdit,
    onOpenCreate,
    onOpenEdit,
    onCloseCreate,
    onCloseEdit,
    openClock,
    handleOpenClock,
    handleCloseClock,
  };
};
