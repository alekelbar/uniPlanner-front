import { Grid, Typography } from "@mui/material";
import CourseCard from "../../../src/components/Courses/CourseCard";
import { useContext } from "react";
import { coursePageContext } from "./context/courseContext";
import { useAppSelector } from "@/redux";
import { Loading } from "../common/Loading";

export const CourseGrid = () => {
  const { courses, loading } = useAppSelector((state) => state.courses);

  const {
    pagination: { currentPage, getCurrentPageItems },
  } = useContext(coursePageContext);

  if (loading) return <Loading called="courses" />;

  return (
    <Grid
      container
      p={1}
      gap={1}
      direction={"row"}
      justifyContent="center"
      alignItems={"baseline"}
    >
      {courses.length ? (
        getCurrentPageItems(courses, currentPage).map((course) => {
          return (
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              key={course._id + course.name}
            >
              <CourseCard course={course} />
            </Grid>
          );
        })
      ) : (
        <Grid item xs={12} sm={12}>
          <Typography align="center" variant="subtitle1" p={5}>
            No hay cursos disponibles
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};
