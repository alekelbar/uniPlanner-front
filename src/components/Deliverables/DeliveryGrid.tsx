import { Container, Grid, Typography } from "@mui/material";
import { DeliveryCard } from "../../../src/components/Deliverables/DeliveryCard";
import { priorityCalc } from "../Career/helpers/priorityCalc";
import { useAppSelector } from "@/redux";
import { Loading } from "../common/Loading";
import { useContext } from "react";
import { deliveryPageContext } from "./context/DeliveryPageContext";
import { DeliveryList } from "./DeliveryList";

export const DeliveryGrid = () => {
  const { deliverables: AllDeliveres, loading } = useAppSelector(
    (state) => state.deliveries
  );

  const deliverables = [...AllDeliveres];
  deliverables.reverse();

  const {
    viewHandler: { grid },
    pagination: { getCurrentPageItems, currentPage },
  } = useContext(deliveryPageContext);

  const sortedDeliveries = [...getCurrentPageItems(deliverables, currentPage)];

  sortedDeliveries.sort((a, b) => {
    return (
      priorityCalc[b.urgency] +
      priorityCalc[b.importance] -
      (priorityCalc[a.urgency] + priorityCalc[a.importance])
    );
  });

  if (loading) return <Loading called="deliveries" />;

  return grid ? (
    <Container sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        direction={"row"}
        justifyContent="center"
        alignItems={"start"}
      >
        {sortedDeliveries.length ? (
          sortedDeliveries.map((delivery) => {
            return (
              <Grid
                component={"div"}
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                key={delivery._id}
              >
                <DeliveryCard deliverable={delivery} />
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} sm={12}>
            <Typography align="center" variant="subtitle1" p={5}>
              No hay entregas disponibles
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  ) : (
    <DeliveryList deliverables={deliverables} />
  );
};
