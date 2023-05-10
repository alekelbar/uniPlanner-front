import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid, Stack,
  Typography
} from "@mui/material";
import { formatDistance } from "date-fns";
import es from "date-fns/locale/es";
import { useRouter } from "next/router";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { useAppDispatch } from "../../redux";
import { setSelectedDelivery } from "../../redux/slices/Deliveries/deliveriesSlice";
import { Loading } from "@/components/common/Loading";
import { makeStatusDate } from "./helpers/makeStatusDate";
import { useDeliveryCard } from "./hooks/useDeliveryCard";

interface DeliveryCardProps {
  deliverable: Deliverable;
}

export function DeliveryCard({ deliverable }: DeliveryCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, colorSeleted, handleRemove, create_at, userId } =
    useDeliveryCard(deliverable);

  if (loading) return <Loading />;

  return (
    <Card
      variant="elevation"
      data-testid="career-card"
      sx={{
        p: 2,
        boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.2)",
      }}
    >
      <CardHeader
        title={deliverable.name}
        titleTypographyProps={{
          variant: "h6",
        }}
        subheader={
          <>
            <Typography variant="subtitle2">
              {deliverable.description}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              Creado:{" "}
              {create_at
                ? formatDistance(create_at, new Date(), {
                    locale: es,
                    addSuffix: true,
                  })
                : "Desconocido"}
            </Typography>
          </>
        }
      />
      <CardContent>
        {makeStatusDate(deliverable)}
        <Typography
          component={"div"}
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"start"}
            alignItems={"baseline"}
          >
            <Box
              sx={{
                px: 2,
                width: "64px",
                height: "5px",
                borderRadius: "8px",
              }}
              bgcolor={colorSeleted}
            />
          </Stack>
        </Typography>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Calificación: {deliverable.note}
        </Typography>
        <Typography
          sx={{
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          Valor: {deliverable.percent}%
        </Typography>
        <Button
          onClick={() => {
            dispatch(setSelectedDelivery(deliverable));
            router.push(
              `/schedule/tasks/list/${deliverable._id}/${deliverable.name}/${userId}`
            );
          }}
          fullWidth
          variant="contained"
          color="secondary"
        >
          VER TAREAS
        </Button>
        <CardActions>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
          >
            <Grid item xs={12} md={6}>
              <Button
                color="success"
                onClick={() => {
                  router.push(`/schedule/deliveries/${deliverable._id}`);
                }}
              >
                Actualizar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button color="error" onClick={handleRemove}>
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
