import { Close, Pause, PlayArrow } from "@mui/icons-material";
import { Backdrop, Button, Container, Stack, Typography } from "@mui/material";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { clearInterval, setInterval } from "timers";
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
    sessionState: { selected },
    clock: { onCloseClock: onClose, openClock },
  } = useContext(sessionPageContext);

  const pauseRef = useRef(false);
  const [pause, setPause] = useState(pauseRef.current);

  console.log("definiendo el estado...", selected);
  const secondsLeftRef = useRef(0);
  const [secondsLeft, setSecondsLeft] = useState(secondsLeftRef.current);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      pauseRef.current = false;
      setPause(pauseRef.current);
      onClose();
    }
  };

  const handleTimer = () => {
    secondsLeftRef.current = selected.duration * 60;
    setSecondsLeft(selected.duration * 60);

    intervalRef.current = setInterval(() => {
      if (secondsLeftRef.current <= 0) {
        return handleReset();
      }

      if (!pauseRef.current) {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
      }
    }, 100);
  };

  useLayoutEffect(() => {
    if (openClock) {
      handleTimer();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [openClock]);

  return (
    <Backdrop
      data-testid={"timer-back"}
      sx={{
        color: "#fff",
        backdropFilter: "blur(3px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={openClock}
    >
      <Stack width={"250px"} height={"250px"}>
        {selected ? (
          <>
            <CircularProgressbarWithChildren
              value={Math.trunc((secondsLeft / (selected.duration * 60)) * 100)}
              styles={buildStyles({
                pathColor:
                  selected.type === SESSION_TYPES.RESTING
                    ? "#ABC4AA"
                    : "#ABC4FF",
                backgroundColor: "#F6F1F1",
              })}
            >
              <Typography variant="caption" fontSize={"2em"}>
                {Math.trunc((secondsLeft / (selected.duration * 60)) * 100)}%
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
                    pauseRef.current = true;
                    setPause(pauseRef.current);
                  }}
                />
              ) : (
                <ControlsContinue
                  onClick={() => {
                    pauseRef.current = false;
                    setPause(pauseRef.current);
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
