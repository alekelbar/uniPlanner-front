import React from "react";
import { useDeliveryCard } from "./hooks/useDeliveryCard";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { makeStatusDate } from "./helpers/makeStatusDate";
import { formatDistance } from "date-fns";
import { es } from "date-fns/locale";
import { Deliverable } from "@/interfaces/deliveries.interface";
import { setSelectedDelivery } from "@/redux/slices/Deliveries/deliveriesSlice";
import { useAppDispatch } from "@/redux";
import { parseToValidUrl } from "@/helpers/parseUrl";

interface DeliveryItemListProps {
  delivery: Deliverable;
}

export const DeliveryItemList: React.FC<DeliveryItemListProps> = ({
  delivery,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { colorSeleted, create_at, loading, handleRemove, userId } =
    useDeliveryCard(delivery);

  return (
    <List sx={{ position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "5px",
          height: "100%",
          bgcolor: colorSeleted,
        }}
      ></Box>
      <ListItem sx={{ textOverflow: "hidden" }}>
        <ListItemText>
          <Typography variant="body1">
            {delivery.name} - {delivery.percent}%
          </Typography>
          <Typography variant="caption">{makeStatusDate(delivery)}</Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
          >
            Creado:{" "}
            {create_at
              ? formatDistance(create_at, new Date(), {
                  locale: { ...es, options: { weekStartsOn: 1 } },
                  addSuffix: true,
                })
              : "Desconocido"}
          </Typography>
        </ListItemText>
        <ListItemButton
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "space-around",
          }}
        >
          <Button
            onClick={() => {
              dispatch(setSelectedDelivery(delivery));
              router.push(
                `/schedule/tasks/list/${delivery._id}/${parseToValidUrl(
                  delivery.name
                )}/${userId}`
              );
            }}
            fullWidth
            variant="contained"
            color="secondary"
            size="small"
          >
            VER TAREAS
          </Button>
        </ListItemButton>
      </ListItem>
    </List>
  );
};
