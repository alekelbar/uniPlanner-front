import { Divider, Grid, Typography } from "@mui/material";
import TaskCard from "../../../src/components/Tasks/TaskCard";
import { useContext } from "react";
import { taskPageContext } from "./context/TaskPageContext";
import { useAppSelector } from "@/redux";
import { Loading } from "../common/Loading";

export const TaskGrid = () => {
  const {
    dialogHandler: { handleOpenClock },
    pagination: { currentPage, getCurrentPageItems },
  } = useContext(taskPageContext);

  const { tasks, loading } = useAppSelector((state) => state.tasks);

  if (loading) return <Loading called="tasks" />;

  return (
    <Grid
      container
      gap={1}
      p={2}
      direction={"row"}
      justifyContent="center"
      alignItems={"center"}
    >
      {tasks.length ? (
        getCurrentPageItems(tasks, currentPage).map((task, index) => {
          if (index >= 5) return null;
          return (
            <Grid
              item
              xs={12}
              sm={4}
              md={3}
              lg={3}
              key={task._id + task.name}
              mb={5}
            >
              <TaskCard task={task} />
              <Divider variant="fullWidth" sx={{ display: { md: "none" } }} />
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12} sm={12}>
          <Typography align="center" variant="subtitle1" p={5}>
            No hay tareas disponibles
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
