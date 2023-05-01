import { Close, Pause, PlayArrow } from "@mui/icons-material";
import { Backdrop, Button, Container, Stack, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { clearInterval, setInterval } from "timers";
import { Loading } from "@/components/common/Loading";
import { sessionPageContext } from "./context/SessionContext";
import { SESSION_TYPES } from "@/interfaces/session-interface";

// Componente para el botón de finalizar la sesión
interface IControlsEnd {
  onClick: () => void;
}

export const ControlsEnd: React.FC<IControlsEnd> = ({ onClick }) => {
  return (
    <Button
      size="large"
      onClick={onClick}
      variant="contained"
      color={"warning"}
    >
      <Close sx={{ fontSize: "2em" }} />
    </Button>
  );
};

// Componente para el botón de pausar la sesión
interface IControlsPause {
  onClick: () => void;
}

export const ControlsPause: React.FC<IControlsPause> = ({ onClick }) => {
  return (
    <Button size="large" onClick={onClick} variant="contained">
      <Pause sx={{ fontSize: "2em" }} />
    </Button>
  );
};

// Componente para el botón de continuar la sesión
interface IControlsContinue {
  onClick: () => void;
}

export const ControlsContinue: React.FC<IControlsContinue> = ({ onClick }) => {
  return (
    <Button size="large" onClick={onClick} variant="contained">
      <PlayArrow sx={{ fontSize: "2em" }} />
    </Button>
  );
};

// Componente para el contenedor de los controles del temporizador
interface ITimerClockControls {
  children: JSX.Element | JSX.Element[];
}

export const TimerControls: React.FC<ITimerClockControls> = ({ children }) => {
  return (
    <Container
      sx={{
        gap: 2,
        width: "100%",
        placeItems: "center",
        mt: 2,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {children}
    </Container>
  );
};

export const SessionTimer: React.FC = () => {
  const {
    sessionState: { selected: session },
    clock: dialogHandler,
  } = useContext(sessionPageContext);

  console.log(session);

  const { onCloseClock: onClose, openClock: open } = dialogHandler;
  const [pause, setPause] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(session.duration * 60);
  const [intervalState, setIntervalState] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleReset = () => {
    if (intervalState) {
      clearInterval(intervalState);
      setPause(false);
      onClose();
    }
  };

  const handleTimer = () => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds <= 0) {
          handleReset();
          return 0;
        }
        if (!pause) {
          return prevSeconds - 1;
        }

        return prevSeconds;
      });
    }, 1000);

    setIntervalState(interval);
  };

  useEffect(() => {
    handleTimer();

    return () => {
      if (intervalState) {
        clearInterval(intervalState);
      }
    };
  }, [session]);

  if (open && !session) return <Loading called="timer" />;

  return (
    <Backdrop
      data-testid={"timer-back"}
      sx={{
        color: "#fff",
        backdropFilter: "blur(3px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Stack width={"250px"} height={"250px"}>
        {session ? (
          <>
            <CircularProgressbarWithChildren
              value={Math.trunc((secondsLeft / (session.duration * 60)) * 100)}
              styles={buildStyles({
                pathColor:
                  session.type === SESSION_TYPES.RESTING
                    ? "#ABC4AA"
                    : "#ABC4FF",
                backgroundColor: "#F6F1F1",
              })}
            >
              <Typography variant="caption" fontSize={"2em"}>
                {Math.trunc((secondsLeft / (session.duration * 60)) * 100)}%
              </Typography>
              <Typography data-testid="session-clock" variant="caption">
                Temporizador
              </Typography>
            </CircularProgressbarWithChildren>
            <TimerControls>
              <ControlsEnd onClick={handleReset} />
              {!pause ? (
                <ControlsPause
                  onClick={() => {
                    setPause(true);
                  }}
                />
              ) : (
                <ControlsContinue
                  onClick={() => {
                    setPause(false);
                  }}
                />
              )}
            </TimerControls>
          </>
        ) : (
          <Typography variant="h2">Ninguna sesión seleccionada</Typography>
        )}
      </Stack>
    </Backdrop>
  );
};
