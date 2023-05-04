import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { RESPONSES } from "../../interfaces/response-messages";
import { TASK_STATUS, Task } from "../../interfaces/task-interface";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setSelectedTask } from "../../redux/slices/Tasks/task-slice";
import { startRemoveTask } from "../../redux/thunks/tasks-thunks";
import { useRouter } from "next/router";
import { taskPageContext } from "./context/TaskPageContext";
import { useContext } from "react";
import { globalContext } from "../Layout/types/GlobalContext";
import { confirmWithSweetAlert } from "@/helpers/swalConfirm";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    pagination: { beforeDelete },
    dialogHandler: { handleOpenClock },
  } = useContext(taskPageContext);
  const { handleShowSnack } = useContext(globalContext);

  const { tasks } = useAppSelector((state) => state.tasks);

  const handleRemove = async () => {
    const confirmation = await confirmWithSweetAlert();
    if (confirmation.isConfirmed) {
      beforeDelete(tasks);
      const response = await dispatch(startRemoveTask(task));
      if (response !== RESPONSES.SUCCESS) {
        handleShowSnack(response);
      }
    }
  };

  return (
    <Card
      variant="elevation"
      data-testid="task-card"
      sx={{ p: 2, boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.2)" }}
    >
      <CardHeader
        title={task.name}
        subheader={
          <>
            <Typography variant="body2" component="p">
              {task.descripcion}
            </Typography>
          </>
        }
      />
      <CardContent>
        <Typography
          sx={{
            color: (theme) =>
              task.status === TASK_STATUS.COMPLETED
                ? theme.palette.success.main
                : theme.palette.warning.main,
          }}
        >
          Estado: {task.status}
        </Typography>
        <Button
          fullWidth
          sx={{
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              transform: "scale(.9)",
            },
          }}
          color="secondary"
          onClick={() => {
            dispatch(setSelectedTask(task));
            handleOpenClock();
          }}
        >
          Temporizar
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
                fullWidth
                variant="contained"
                onClick={() => {
                  router.push(`/schedule/tasks/${task._id}`);
                }}
                color="success"
              >
                Actualizar
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                fullWidth
                variant="contained"
                color="error"
                onClick={handleRemove}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
