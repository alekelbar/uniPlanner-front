import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Tooltip,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { MIN_CARD_HEIGHT } from "../../config/sizes";
import { Course } from "../../interfaces/course.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { useAppDispatch } from "../../redux/hooks";
import { setSelectedCourse } from "../../redux/slices/Courses/coursesSlice";
import { startRemoveCourse } from "../../redux/thunks/courses.thunks";
import { useCallback, useEffect, useState } from "react";
import { CourseService } from "@/services/Course";

interface CourseCardProps {
  course: Course;
  onOpenEdit: () => void;
  reload: (page: number) => void;
  actualPage: number;
}

export default function CourseCard({
  course,
  reload,
  actualPage,
}: CourseCardProps): JSX.Element {
  const { courseDescription, name, credits } = course;

  const [grade, setGrade] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    query: { userId },
  } = router;

  const getGrade = useCallback(async () => {
    const grade = await new CourseService().getCourseGrade(
      course._id as string
    );

    if (grade.status !== 200) {
      setGrade("No disponible");
    }
    const { data } = grade;
    setGrade(`${data.totalGrade}%`);
  }, [course._id]);

  useEffect(() => {
    getGrade();
  });

  const handleDelete = useCallback(async () => {
    const response = await dispatch(startRemoveCourse(course));
    if (response !== RESPONSES.SUCCESS) {
      Swal.fire(response);
    }
    reload(actualPage);
  }, [reload, actualPage, course, dispatch]);

  return (
    <Card
      variant="elevation"
      data-testid="course-card"
      sx={{
        minHeight: MIN_CARD_HEIGHT,
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
              `/schedule/deliveries/list/${course._id}/${course.name}/${userId}`
            );
          }}
        >
          VER ENTREGABLES
        </Button>
        <CardActions>
          <Button color="error" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button
            color="success"
            onClick={() => {
              router.push(`/schedule/courses/${course._id}/`);
            }}
          >
            Actualizar
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
