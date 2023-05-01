import { Backdrop, Button, Grid, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatSeconds } from "./helpers/formatSeconds";
import { useAppSelector } from "../../redux";
import Image from "next/image";

interface TimerClockProps {
  open: boolean;
  onClose: () => void;
  title?: string;
}

export default function TimerClock({
  open,
  onClose,
}: TimerClockProps): JSX.Element {
  const { selected } = useAppSelector((st) => st.tasks);

  const [seconds, setSeconds] = useState(0);
  const pauseRef = useRef(false);
  const [pause, setPause] = useState(pauseRef.current);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleReset = () => {
    if (selected && intervalRef.current) {
      clearInterval(intervalRef.current);
      setSeconds(0);
      pauseRef.current = false;
      setPause(pauseRef.current);
      onClose();
    }
  };

  const handleTimer = () => {
    if (selected) {
      setSeconds(0);
      pauseRef.current = false;
      setPause(pauseRef.current);

      intervalRef.current = setInterval(() => {
        if (!pauseRef.current) {
          setSeconds((prevSeconds) => prevSeconds + 1);
        }
      }, 1000);
    }
  };

  useEffect(() => {
    if (open) {
      handleTimer();
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [open]);

  return (
    <Backdrop
      sx={{
        color: "#fff",
        backdropFilter: "blur(3px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <Stack
        sx={{
          width: {
            xs: "80%",
            sm: "50%",
            md: "40%",
            lg: "30%",
            xl: "20%",
          },
        }}
      >
        {selected ? (
          <>
            <CircularProgressbarWithChildren
              data-testid="session-clock"
              value={100}
              styles={buildStyles({
                pathColor: !pause ? "#ABC4AA" : "#B46060",
                backgroundColor: "#F6F1F1",
              })}
            >
              <Image
                src="https://i.imgur.com/b9NyUGm.png"
                alt="doge"
                width={75}
                height={75}
              />
              <Typography variant="h4">{formatSeconds(seconds)}</Typography>
              <Typography variant="subtitle2"> {selected.name}</Typography>
            </CircularProgressbarWithChildren>
            <Grid
              container
              width={"90%"}
              sx={{ placeItems: "center" }}
              gap={2}
              m={"0 auto"}
              p={2}
              direction="column"
            >
              <Button fullWidth onClick={handleReset} variant="contained">
                Terminar
              </Button>
              {!pause ? (
                <Button
                  fullWidth
                  color="info"
                  variant="contained"
                  onClick={() => {
                    pauseRef.current = true;
                    setPause(pauseRef.current);
                  }}
                >
                  Pausar
                </Button>
              ) : (
                <Button
                  fullWidth
                  color="success"
                  variant="contained"
                  onClick={() => {
                    pauseRef.current = false;
                    setPause(pauseRef.current);
                  }}
                >
                  Continuar
                </Button>
              )}
            </Grid>
          </>
        ) : (
          <Typography variant="h2">Ninguna sesión seleccionada</Typography>
        )}
      </Stack>
    </Backdrop>
  );
}
