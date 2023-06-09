import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { MIN_CARD_HEIGHT } from "../../config/sizes";
import { RESPONSES } from "../../interfaces/response-messages";
import { SESSION_TYPES, Session } from "../../interfaces/session-interface";
import { useAppDispatch, useAppSelector } from "../../redux";
import { startRemoveSession } from "../../redux/thunks/session-thunks";
import { useContext } from "react";
import { sessionPageContext } from "./context/SessionContext";
import { globalContext } from "../Layout/types/GlobalContext";
import { confirmWithSweetAlert } from "@/helpers/swalConfirm";

interface SessionCardProps {
  session: Session;
  onStartSession: () => void;
}

export default function SessionCard({
  session,
  onStartSession,
}: SessionCardProps): JSX.Element {
  const { duration, name, type } = session;

  const dispatch = useAppDispatch();
  const { handleShowSnack } = useContext(globalContext);

  const {
    pagination: { beforeDelete },
  } = useContext(sessionPageContext);
  const { sessions } = useAppSelector((state) => state.sessions);

  const handleDelete = async () => {
    const confirmation = await confirmWithSweetAlert();
    if (confirmation.isConfirmed) {
      beforeDelete(sessions);
      const response = await dispatch(startRemoveSession(session));
      if (response !== RESPONSES.SUCCESS) {
        handleShowSnack(response);
      }
    }
  };

  return (
    <Card
      variant="elevation"
      data-testid="session-card"
      sx={{
        p: 2,
        boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.2)",
        minHeight: MIN_CARD_HEIGHT,
      }}
    >
      <CardHeader
        title={name}
        sx={{
          color: (theme) => theme.palette.text.primary,
        }}
        subheader={
          <Tooltip
            title="Cantidad de creditos correspondientes a esta materia"
            placement="top-start"
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: (theme) =>
                  session.type === SESSION_TYPES.RESTING
                    ? theme.palette.success.main
                    : theme.palette.info.main,
              }}
              gutterBottom
            >
              {type} : {duration} minutos
            </Typography>
          </Tooltip>
        }
      />
      <CardContent>
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => {
            onStartSession();
          }}
        >
          Iniciar la sesión
        </Button>
        <CardActions>
          <Button color="error" onClick={handleDelete}>
            Eliminar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
