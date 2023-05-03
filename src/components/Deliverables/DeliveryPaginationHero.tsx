import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux";
import { useContext } from "react";
import { deliveryPageContext } from "./context/DeliveryPageContext";

export const DeliveryPaginationHero = () => {
  const {
    query: { courseName },
  } = useRouter();

  const {
    pagination: { ITEMS_PER_PAGE, currentPage, handlePagination },
  } = useContext(deliveryPageContext);

  const { deliverables } = useAppSelector((state) => state.deliveries);
  const totalPages = Math.ceil(deliverables.length / ITEMS_PER_PAGE);

  return (
    <Box
      component={"div"}
      position="sticky"
      top={0}
      sx={{
        backgroundColor: "white",
        zIndex: "10",
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
            size="small"
            count={totalPages}
            onChange={handlePagination}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
