import {
  DELIVERABLE_STATUS,
  Deliverable,
} from "@/interfaces/deliveries.interface";
import { Typography } from "@mui/material";
import { formatDistance, isAfter, parseISO } from "date-fns";
import es from "date-fns/locale/es";

export const makeStatusDate = (deliverable: Deliverable) => {
  const deadline = parseISO(deliverable.deadline.toString());

  if (deliverable.status === DELIVERABLE_STATUS.PENDING) {
    if (isAfter(new Date(), deadline)) {
      return (
        <Typography
          variant="subtitle1"
          sx={{
            color: (theme) => theme.palette.error.main,
          }}
        >
          {formatDistance(deadline, new Date(), {
            locale: { ...es, options: { weekStartsOn: 1 } },
            addSuffix: true,
          }).toUpperCase()}
        </Typography>
      );
    }
    return (
      <Typography
        variant="subtitle1"
        sx={{
          color: (theme) => theme.palette.warning.main,
        }}
      >
        {formatDistance(deadline, new Date(), {
          locale: { ...es, options: { weekStartsOn: 1 } },
          addSuffix: true,
        }).toUpperCase()}
      </Typography>
    );
  }

  return (
    <Typography
      variant="subtitle1"
      sx={{
        color: (theme) => theme.palette.success.main,
      }}
    >
      Entregado
    </Typography>
  );
};
