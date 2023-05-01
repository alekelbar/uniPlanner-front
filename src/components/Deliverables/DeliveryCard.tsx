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
import { formatDistance, isAfter, parseISO } from "date-fns";
import es from "date-fns/locale/es";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { MIN_CARD_HEIGHT } from "../../config/sizes";
import {
  DELIVERABLE_STATUS,
  Deliverable,
} from "../../interfaces/deliveries.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setSelectedDelivery } from "../../redux/slices/Deliveries/deliveriesSlice";
import { startRemoveDelivery } from "../../redux/thunks/deliverables-thunks";
import {
  ColorMatrixPreferences,
  getPriorityColor,
} from "../Career/helpers/priorityCalc";
import { useCallback, useEffect } from "react";
import { startLoadSetting } from "../../redux/thunks/settings-thunks";
import { Loading } from "@/components/common/Loading";

interface DeliveryCardProps {
  deliverable: Deliverable;
  reload: (page?: number) => void;
  onOpenEdit: () => void;
  actualPage: number;
}

export function DeliveryCard({
  deliverable,
  reload,
  onOpenEdit,
  actualPage,
}: DeliveryCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { selected, loading } = useAppSelector((state) => state.setting);

  const {
    query: { userId, courseId },
  } = useRouter();

  let create_at: Date = new Date();
  const deadline = parseISO(deliverable.deadline.toString());

  if (deliverable.createdAt) {
    create_at = parseISO(deliverable.createdAt.toString());
  }

  const onLoad = useCallback(async () => {
    const response = await dispatch(startLoadSetting(userId as string));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (!selected.user)
      // verificando si es la configuración por defecto...
      onLoad();
  }, [selected.user, onLoad]);

  const makeStatusDate = () => {
    if (deliverable.status === DELIVERABLE_STATUS.PENDING) {
      if (isAfter(new Date(), deadline)) {
        return (
          <Typography
            component={"div"}
            variant="subtitle1"
            sx={{
              color: (theme) => theme.palette.error.main,
            }}
          >
            {formatDistance(deadline, new Date(), {
              locale: es,
              addSuffix: true,
            }).toUpperCase()}
          </Typography>
        );
      }
      return (
        <Typography
          component={"div"}
          variant="subtitle1"
          sx={{
            color: (theme) => theme.palette.warning.main,
          }}
        >
          {formatDistance(deadline, new Date(), {
            locale: es,
            addSuffix: true,
          }).toUpperCase()}
        </Typography>
      );
    }

    return (
      <Typography
        component={"div"}
        variant="subtitle1"
        sx={{
          color: (theme) => theme.palette.success.main,
        }}
      >
        Entregado
      </Typography>
    );
  };

  const handleRemove = async () => {
    const response = await dispatch(
      startRemoveDelivery({
        ...deliverable,
        _id: deliverable._id,
        course: courseId as string,
      })
    );
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
    reload(actualPage);
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
    <Card
      variant="elevation"
      data-testid="career-card"
      sx={{
        minHeight: MIN_CARD_HEIGHT,
      }}
    >
      <CardHeader
        title={deliverable.name}
        titleTypographyProps={{
          variant: "h6",
        }}
        subheader={
          <>
            <Typography variant="subtitle2" component="p">
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
        {makeStatusDate()}
        <Typography
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
              component={"div"}
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
          <Button
            color="success"
            onClick={() => {
              router.push(`/schedule/deliveries/${deliverable._id}`);
            }}
          >
            Actualizar
          </Button>
          <Button color="error" onClick={handleRemove}>
            Eliminar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
