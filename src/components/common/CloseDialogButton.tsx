import { Close } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";

export const CloseDialogButton = ({ onClose }: { onClose: VoidFunction }) => {
  return (
    <Button onClick={onClose}>
      <Close color="warning" />
    </Button>
  );
};
