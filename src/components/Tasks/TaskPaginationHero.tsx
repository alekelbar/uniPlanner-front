import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext } from "react";
import { taskPageContext } from "./context/TaskPageContext";
import { useAppSelector } from "@/redux";
import { COLOR_PANELS } from "@/config/customColors";

export const TaskPaginationHero = () => {
  const {
    query: { deliveryName },
  } = useRouter();

  const {
    pagination: { ITEMS_PER_PAGE, currentPage, handlePagination },
  } = useContext(taskPageContext);

  const { tasks } = useAppSelector((state) => state.tasks);
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  return (
    <Box
      component={"div"}
      position="sticky"
      top={0}
      sx={{
        backgroundColor: COLOR_PANELS,
        zIndex: "10",
      }}
    >
      <Typography mt={1} align="center" variant="subtitle1">
        {`${deliveryName}`}
      </Typography>
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
              py: 1,
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
