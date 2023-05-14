import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux";
import { useContext } from "react";
import { deliveryPageContext } from "./context/DeliveryPageContext";
import { COLOR_PANELS } from "@/config/customColors";

export const DeliveryPaginationHero = () => {
  const {
    query: { courseName },
  } = useRouter();

  const {
    viewHandler: { grid },
    pagination: { ITEMS_PER_PAGE, currentPage, handlePagination },
  } = useContext(deliveryPageContext);

  const { deliverables } = useAppSelector((state) => state.deliveries);
  const totalPages = Math.ceil(deliverables.length / ITEMS_PER_PAGE);

  return (
    <Box
      component={"div"}
      display={grid ? "" : "none"}
      sx={{
        backgroundColor: COLOR_PANELS,
      }}
    >
      <Typography mt={1} align="center" variant="subtitle1">
        {`${courseName}`}
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
            size="medium"
            count={totalPages}
            onChange={handlePagination}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
