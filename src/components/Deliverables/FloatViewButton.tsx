import React, { useContext } from "react";
import { deliveryPageContext } from "./context/DeliveryPageContext";
import { FloatButton } from "../common/FloatButton";
import { ViewArray } from "@mui/icons-material";

export const FloatViewButton = () => {
  const {
    dialogHandler: { onOpenCreate },
  } = useContext(deliveryPageContext);

  return (
    <FloatButton
      onAction={onOpenCreate}
      icon={<ViewArray sx={{ fontSize: { md: "2.5em" } }} />}
      sxProps={{ position: "fixed", bottom: 120, right: 16 }}
    />
  );
};
