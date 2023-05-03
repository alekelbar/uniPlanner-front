import { Grid, Typography } from "@mui/material";
import { DeliveryCard } from "../../../src/components/Deliverables/DeliveryCard";
import { priorityCalc } from "../Career/helpers/priorityCalc";
import { useAppSelector } from "@/redux";
import { Loading } from "../common/Loading";
import { useContext } from "react";
import { deliveryPageContext } from "./context/DeliveryPageContext";

export const DeliveryGrid = () => {
  const { deliverables, loading } = useAppSelector((state) => state.deliveries);

  const {
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

  return (
    <Grid
      container
      gap={1}
      p={2}
      direction={"row"}
      justifyContent="space-around"
      alignItems={"baseline"}
    >
      {sortedDeliveries.length ? (
        sortedDeliveries.map((delivery) => {
          return (
            <Grid
              component={"div"}
              item
              xs={12}
              sm={4}
              md={6}
              lg={3}
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
  );
};
