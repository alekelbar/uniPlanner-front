import { Stack } from "@mui/system";
import { useDeliveries } from "@/components/Deliverables/hooks/useDeliveries";
import { ReactElement } from "react";
import { DeliveryProvider } from "./context/DeliveryPageContext";
import { DeliveryPaginationHero } from "./DeliveryPaginationHero";
import { DeliveryGrid } from "./DeliveryGrid";
import { DeliveryFloatAddButton } from "./DeliveryFloatButton";
import { DeliveryAddForm } from "./DeliveryAddForm";
import { FloatViewButton } from "./FloatViewButton";

export function DeliveryPage({
  children,
}: {
  children: ReactElement | ReactElement[];
}): JSX.Element {
  const context = useDeliveries(2);

  return (
    <DeliveryProvider value={context}>
      <Stack component={"div"} direction="column" sx={{ borderRadius: ".8em" }}>
        {children}
      </Stack>
    </DeliveryProvider>
  );
}

DeliveryPage.PaginationHero = DeliveryPaginationHero;
DeliveryPage.Grid = DeliveryGrid;
DeliveryPage.FloatAddButton = DeliveryFloatAddButton;
DeliveryPage.FloatViewButton = FloatViewButton;
DeliveryPage.AddForm = DeliveryAddForm;
