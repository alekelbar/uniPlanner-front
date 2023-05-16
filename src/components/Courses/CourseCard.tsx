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
import { globalContext } from "../Layout/types/GlobalContext";
import { confirmWithSweetAlert } from "@/helpers/swalConfirm";
import { parseToValidUrl } from "@/helpers/parseUrl";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps): JSX.Element {
  const { courseDescription, name, credits } = course;

  const {
    pagination: { beforeDelete },
  } = useContext(coursePageContext);

  const { handleShowSnack } = useContext(globalContext);

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
    const confirmation = await confirmWithSweetAlert();
    if (confirmation.isConfirmed) {
      beforeDelete(courses);
      const response = await dispatch(startRemoveCourse(course));
      if (response !== RESPONSES.SUCCESS) {
        handleShowSnack(response);
      }
    }
  };

  return (
    <Card
      variant="elevation"
      data-testid="course-card"
      sx={{
        animation: "all 1s",
        p: 2,
        boxShadow: "0px 0px 5px 5px rgba(0, 0, 0, 0.2)",
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
              `/schedule/deliveries/list/${course._id}/${parseToValidUrl(
                course.name
              )}/${course.user}`
            );
          }}
        >
          VER ENTREGABLES
        </Button>
        <CardActions>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
            spacing={1}
          >
            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                fullWidth
                color="success"
                onClick={() => {
                  router.push(`/schedule/courses/${course._id}/`);
                }}
              >
                Actualizar
              </Button>
            </Grid>

            <Grid item xs={12} md={6}>
              <Button
                variant="outlined"
                fullWidth
                color="error"
                onClick={handleRemove}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </CardContent>
    </Card>
  );
}
