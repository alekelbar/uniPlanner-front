import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { DeliveryCard } from "../../../src/components/Deliverables/DeliveryCard";
import { priorityCalc } from "../Career/helpers/priorityCalc";
import { useAppSelector } from "@/redux";
import { Loading } from "../common/Loading";
import { useContext } from "react";
import { deliveryPageContext } from "./context/DeliveryPageContext";
import { DeliveryDining, ExpandMore } from "@mui/icons-material";
import { DeliveryItemList } from "./DeliveryItemList";
import {
  addWeeks,
  endOfWeek,
  isAfter,
  isBefore,
  isThisWeek,
  isTomorrow,
  isWithinInterval,
  parseISO,
  startOfWeek,
} from "date-fns";
import { addDays } from "date-fns";
import { isSameDay } from "date-fns";

export const DeliveryGrid = () => {
  const { deliverables, loading } = useAppSelector((state) => state.deliveries);

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
  ) : (
    <Container sx={{ mt: 4 }} maxWidth={"sm"}>
      {/* Mañana */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Mañana</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {deliverables
              .filter((delivery) => {
                const deadline = parseISO(delivery.deadline.toString());
                return isTomorrow(deadline);
              })
              .map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
      {/* Esta semana */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Esta semana</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {deliverables
              .filter((delivery) => {
                const deadline = parseISO(delivery.deadline.toString());
                return isThisWeek(deadline) && !isTomorrow(deadline);
              })
              .map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
      {/* Próxima semana */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>La proxima semana</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {deliverables
              .filter((delivery) => {
                const deadline = parseISO(delivery.deadline.toString());
                const endWeek = addWeeks(startOfWeek(new Date()), 1); // esta semana termina en...
                return (
                  isAfter(deadline, endWeek) &&
                  isBefore(deadline, endOfWeek(endWeek))
                );
              })
              .map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
      {/* en 30 días */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>En 30 días</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {deliverables
              .filter((delivery) => {
                const deadline = parseISO(delivery.deadline.toString());
                return (
                  isAfter(deadline, addDays(new Date(), 29)) &&
                  isBefore(deadline, addDays(new Date(), 59))
                );
              })
              .map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
      {/* en 60 días */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>En 60 días</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {deliverables
              .filter((delivery) => {
                const deadline = parseISO(delivery.deadline.toString());
                return isAfter(deadline, addDays(new Date(), 59));
              })
              .map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
