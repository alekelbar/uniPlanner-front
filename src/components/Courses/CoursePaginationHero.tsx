import { Box, Grid, Pagination, Typography } from "@mui/material";
import { useContext } from "react";
import { coursePageContext } from "./context/courseContext";
import { useRouter } from "next/router";
import { useAppSelector } from "@/redux";

export const CoursePaginationHero = () => {
  const { courses } = useAppSelector((state) => state.courses);

  const {
    pagination: { currentPage, handlePagination, ITEMS_PER_PAGE },
  } = useContext(coursePageContext);

  const {
    query: { careerName },
  } = useRouter();

  const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);

  return (
    <Box
      position="sticky"
      top={0}
      sx={{
        zIndex: "10",
      }}
    >
      <Typography mt={1} align="center" variant="subtitle1">
        {`${careerName}`}
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
