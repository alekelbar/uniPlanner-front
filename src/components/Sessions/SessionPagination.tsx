import { Box, Grid, Pagination, Theme, Typography } from "@mui/material";
import { useContext } from "react";
import { sessionPageContext } from "./context/SessionContext";
import { useTheme } from "@emotion/react";
import { useAppSelector } from "@/redux";

export const SessionPagination = () => {
  const theme: Partial<Theme> = useTheme();

  const {
    pagination: { currentPage, handlePagination, ITEMS_PER_PAGE },
  } = useContext(sessionPageContext);

  const { sessions } = useAppSelector((state) => state.sessions);
  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE);

  return (
    <Box
      position="sticky"
      top={0}
      sx={{
        backgroundColor: "white",
        zIndex: "10",
      }}
    >
      <Typography
        mt={1}
        align="center"
        variant="subtitle1"
      >{`Sessiones de Usuario`}</Typography>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent={"center"}
        alignItems="center"
      >
        <Grid item>
          <Pagination
            page={currentPage}
            sx={{
              width: "100%",
              [theme?.breakpoints!.up("md")]: {
                fontSize: "large",
              },
              pb: 2,
            }}
            size="small"
            count={totalPages}
            onChange={handlePagination}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
