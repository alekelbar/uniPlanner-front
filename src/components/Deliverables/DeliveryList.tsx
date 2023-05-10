import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Container, List, Typography
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { DeliveryItemList } from "./DeliveryItemList";
import {
  addWeeks,
  endOfWeek,
  isAfter,
  isBefore,
  isThisWeek,
  isTomorrow, parseISO,
  startOfWeek
} from "date-fns";
import { addDays } from "date-fns";
import { Deliverable } from "@/interfaces/deliveries.interface";

interface DeliveryListProps {
  deliverables: Deliverable[];
}

export const DeliveryList: React.FC<DeliveryListProps> = ({ deliverables }) => {
  return (
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
