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
import { useAppDispatch } from "../../redux";
import { setSelectedTask } from "../../redux/slices/Tasks/task-slice";
import { startRemoveTask } from "../../redux/thunks/tasks-thunks";
import { useRouter } from "next/router";

interface TaskCardProps {
  task: Task;
  reload: (page: number) => void;
  onOpenEdit: () => void;
  actualPage: number;
  openClock: () => void;
}

export default function TaskCard({
  task,
  reload,
  onOpenEdit,
  actualPage,
  openClock,
}: TaskCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRemove = async () => {
    const response = await dispatch(startRemoveTask(task));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
    reload(actualPage);
  };

  return (
    <Card
      variant="elevation"
      data-testid="task-card"
      sx={
        {
          // minHeight: MIN_CARD_HEIGHT,
        }
      }
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
          variant="contained"
          sx={{
            cursor: "pointer",
            transition: "all 0.3s",
            "&:hover": {
              transform: "scale(.9)",
            },
          }}
          onClick={() => {
            dispatch(setSelectedTask(task));
            openClock();
          }}
          color="secondary"
        >
          Temporizar
        </Button>
        <CardActions>
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
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={handleRemove}
          >
            Eliminar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
