import { sessionPageContext } from "./context/SessionContext";
import { Divider, Grid, Typography } from "@mui/material";
import SessionCard from "../../../src/components/Sessions/SessionCard";
import {
  setSelectedSession,
  useAppDispatch,
  useAppSelector,
} from "@/redux";
import { useContext } from "react";
import { Loading } from "../common/Loading";

export const SessionGrid = () => {
  const { sessions, loading } = useAppSelector((state) => state.sessions);

  const dispatch = useAppDispatch();
  const {
    pagination: { getCurrentPageItems, currentPage },
    clock: { onOpenClock },
  } = useContext(sessionPageContext);

  if (loading) return <Loading called="session" />;

  return (
    <Grid
      container
      p={1}
      gap={1}
      direction={"row"}
      justifyContent="center"
      alignItems={"center"}
    >
      {sessions.length ? (
        getCurrentPageItems(sessions, currentPage).map((session) => {
          return (
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              key={session._id + session.name}
            >
              <SessionCard
                onStartSession={() => {
                  dispatch(setSelectedSession(session));
                  onOpenClock();
                }}
                session={session}
              />
              <Divider variant="fullWidth" sx={{ display: { md: "none" } }} />
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12} sm={12}>
          <Typography align="center" variant="subtitle1" p={5}>
            No hay SESSIONES disponibles
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
