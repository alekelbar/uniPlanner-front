import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Container,
  List,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { DeliveryItemList } from "./DeliveryItemList";
import {
  Locale,
  endOfWeek,
  isAfter,
  isBefore,
  isThisWeek,
  isTomorrow,
  parseISO,
} from "date-fns";
import es from "date-fns/locale/es"; // importa el objeto Locale para el español
import { addDays } from "date-fns";
import { Deliverable } from "@/interfaces/deliveries.interface";
import { useRouter } from "next/router";
import React from "react";

const locale: Locale = {
  ...es,
  options: {
    ...es.options,
    weekStartsOn: 1,
  },
};

interface DeliveryListProps {
  deliverables: Deliverable[];
}

export const DeliveryList: React.FC<DeliveryListProps> = ({ deliverables }) => {
  const {
    query: { courseName },
  } = useRouter();

  const AlertNothing = () => (
    <Alert variant="filled" title="Info" color="info">
      <Typography>Nada por aquí.</Typography>
    </Alert>
  );

  const lists = {
    tomorrow: deliverables.filter((delivery) => {
      const deadline = parseISO(delivery.deadline.toString());
      return isTomorrow(deadline);
    }),

    thisWeek: deliverables.filter((delivery) => {
      const deadline = parseISO(delivery.deadline.toString());
      return isThisWeek(deadline, { locale }) && !isTomorrow(deadline);
    }),

    nextWeek: deliverables.filter((delivery) => {
      const deadline = parseISO(delivery.deadline.toString());
      const endWeek = endOfWeek(new Date(), { locale }); // esta semana termina en...
      const endOfNextWeek = endOfWeek(addDays(endWeek, 1), { locale }); // esta semana termina en...

      return isAfter(deadline, endWeek) && isBefore(deadline, endOfNextWeek);
    }),

    inThirtyDays: deliverables.filter((delivery) => {
      const deadline = parseISO(delivery.deadline.toString());
      return (
        isAfter(deadline, addDays(new Date(), 29)) &&
        isBefore(deadline, addDays(new Date(), 59))
      );
    }),

    inSixtyDays: deliverables.filter((delivery) => {
      const deadline = parseISO(delivery.deadline.toString());
      return isAfter(deadline, addDays(new Date(), 59));
    }),
  };

  return (
    <Container sx={{ mt: 4 }} maxWidth={"sm"}>
      <Typography variant="h5" align="center" m={2} color={"black"}>
        {courseName}
      </Typography>
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
            {lists.tomorrow.length ? (
              lists.tomorrow.map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })
            ) : (
              <AlertNothing />
            )}
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
            {lists.thisWeek.length ? (
              lists.thisWeek.map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })
            ) : (
              <AlertNothing />
            )}
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
            {lists.nextWeek.length ? (
              lists.nextWeek.map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })
            ) : (
              <AlertNothing />
            )}
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
            {lists.inThirtyDays.length ? (
              lists.inThirtyDays.map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })
            ) : (
              <AlertNothing />
            )}
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
            {lists.inSixtyDays.length ? (
              lists.inSixtyDays.map((delivery) => {
                return (
                  <DeliveryItemList key={delivery._id} delivery={delivery} />
                );
              })
            ) : (
              <AlertNothing />
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
