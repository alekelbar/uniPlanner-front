import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { Course } from "../../interfaces/course.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedCourse } from "../../redux/slices/Courses/coursesSlice";
import { startRemoveCourse } from "../../redux/thunks/courses.thunks";
import { useCallback, useContext, useEffect, useState } from "react";
import { CourseService } from "@/services/Course";
import { coursePageContext } from "./context/courseContext";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { courseDescription, name, credits } = course;

  const {
    pagination: { beforeDelete },
  } = useContext(coursePageContext);

  const { courses } = useAppSelector((state) => state.courses);

  const [grade, setGrade] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const getGrade = useCallback(async () => {
    const grade = await new CourseService().getCourseGrade(
      course._id as string
    );

    if (grade.status !== 200) {
      setGrade("No disponible");
    }
    const { data } = grade;
    setGrade(`${data?.totalGrade}%`);
  }, [course._id]);

  useEffect(() => {
    getGrade();
  });

  const handleRemove = async () => {
    beforeDelete(courses);
    const response = await dispatch(startRemoveCourse(course));
    if (response !== RESPONSES.SUCCESS) {
      Swal.fire(response);
    }
  };

  return (
    <Card
      variant="elevation"
      data-testid="course-card"
      sx={{
        animation: "all 1s",
      }}
    >
      <CardHeader
        title={name}
        titleTypographyProps={{
          variant: "h6",
        }}
        sx={{
          color: (theme) => theme.palette.text.primary,
        }}
        subheader={
          <Typography
            variant="h6"
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
            gutterBottom
          >
            Creditos: {credits} <br />
            <Box
              component={"span"}
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
            >
              Avance: {grade}
            </Box>
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {courseDescription}
        </Typography>
        <Button
          fullWidth
          color="secondary"
          onClick={() => {
            dispatch(setSelectedCourse(course));
            router.push(
              `/schedule/deliveries/list/${course._id}/${course.name}/${course.user}`
            );
          }}
        >
          VER ENTREGABLES
        </Button>
        <CardActions>
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            spacing={1}
          >
            <Grid item xs={12} md={6}>
              <Button
                color="success"
                onClick={() => {
                  router.push(`/schedule/courses/${course._id}/`);
                }}
              >
                Actualizar
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button color="error" onClick={handleRemove}>
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
