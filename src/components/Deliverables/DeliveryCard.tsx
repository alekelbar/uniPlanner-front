import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { formatDistance, parseISO } from "date-fns";
import es from "date-fns/locale/es";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Deliverable } from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setSelectedDelivery } from "../../redux/slices/Deliveries/deliveriesSlice";
import { startRemoveDelivery } from "../../redux/thunks/deliverables-thunks";
import {
  ColorMatrixPreferences,
  getPriorityColor,
} from "../Career/helpers/priorityCalc";
import { useCallback, useContext, useEffect, useState } from "react";
import { startLoadSetting } from "../../redux/thunks/settings-thunks";
import { Loading } from "@/components/common/Loading";
import { makeStatusDate } from "./helpers/makeStatusDate";
import { deliveryPageContext } from "./context/DeliveryPageContext";

interface DeliveryCardProps {
  deliverable: Deliverable;
}

export function DeliveryCard({ deliverable }: DeliveryCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    pagination: { beforeDelete },
  } = useContext(deliveryPageContext);

  const { deliverables } = useAppSelector((state) => state.deliveries);

  const { selected, loading } = useAppSelector((state) => state.setting);

  const {
    query: { userId, courseId },
  } = useRouter();

  let create_at: Date = new Date();

  if (deliverable.createdAt) {
    create_at = parseISO(deliverable.createdAt.toString());
  }

  const loadingUserSettings = useCallback(async () => {
    const response = await dispatch(startLoadSetting(userId as string));

    if (response.trim() === RESPONSES.INVALID_ID) {
      await router.push("/");
      return;
    }

    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    // El usuario default(no user) tiene el ID por defecto.
    if (!selected.user) loadingUserSettings();
  }, [selected.user, loadingUserSettings]);

  const handleRemove = async () => {
    beforeDelete(deliverables);
    const response = await dispatch(
      startRemoveDelivery({
        ...deliverable,
        course: courseId as string,
      })
    );

    if (response !== RESPONSES.SUCCESS) {
      Swal.fire(response);
    }
  };

  const { importance, urgency } = deliverable;
  const { do: doing, delegate, ignore, prepare } = selected;

  const userMatrizColor: ColorMatrixPreferences = {
    delegate,
    do: doing,
    ignore,
    prepare,
  };

  const colorSeleted = getPriorityColor(importance, urgency, userMatrizColor);

  if (loading) return <Loading />;

  return (
    <Card variant="elevation" data-testid="career-card" sx={{}}>
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
