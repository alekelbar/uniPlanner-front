import { Close, Pause, PlayArrow } from "@mui/icons-material";
import {
  Backdrop,
  Button, Grid,
  Stack,
  Typography
} from "@mui/material";
import React, {
  useContext,
  useEffect, useRef,
  useState
} from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { clearInterval, setInterval } from "timers";
import { sessionPageContext } from "./context/SessionContext";
import { SESSION_TYPES } from "@/interfaces/session-interface";
import Image from "next/image";
import { useAppSelector } from "@/redux";

// Componente para el botón de finalizar la sesión
interface IControlsEnd {
  onClick: () => void;
}

export const ControlsEnd: React.FC<IControlsEnd> = ({ onClick }) => {
  return (
    <Button
      fullWidth
      size="large"
      onClick={onClick}
      variant="contained"
      color={"error"}
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
    <Button fullWidth size="large" onClick={onClick} variant="contained">
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
    <Button fullWidth size="large" onClick={onClick} variant="contained">
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
    <Grid
      container
      width={"90%"}
      sx={{ placeItems: "center" }}
      gap={2}
      m={"0 auto"}
      p={2}
      direction="column"
    >
      {children}
    </Grid>
  );
};

export const SessionTimer: React.FC = () => {
  const { selected } = useAppSelector((state) => state.sessions);

  const {
    clock: { onCloseClock: onClose, openClock },
  } = useContext(sessionPageContext);

  const pauseRef = useRef(false);
  const [pause, setPause] = useState(pauseRef.current);

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

  useEffect(() => {
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
                rotation: 0.25,
                strokeLinecap: "butt",
                textSize: ".5em",
                pathTransitionDuration: 0.5,
                textColor: "#f88",
                trailColor: "#d6d6d6",
                pathColor:
                  selected.type === SESSION_TYPES.RESTING
                    ? "#ABC4AA"
                    : "#ABC4FF",
                backgroundColor: "#F6F1F1",
              })}
            >
              <Image
                src="https://i.imgur.com/b9NyUGm.png"
                alt="doge"
                width={75}
                height={75}
              />
              <Typography variant="caption" fontSize={"2em"}>
                {Math.trunc((secondsLeft / (selected.duration * 60)) * 100)}%
              </Typography>
              <Typography data-testid="session-clock" variant="caption">
                Temporizador
              </Typography>
            </CircularProgressbarWithChildren>
            <TimerControls>
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
              <ControlsEnd onClick={handleReset} />
            </TimerControls>
          </>
        ) : (
          <Typography variant="h2">Ninguna sesión seleccionada</Typography>
        )}
      </Stack>
    </Backdrop>
  );
};
