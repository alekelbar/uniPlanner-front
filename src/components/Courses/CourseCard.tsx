import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
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
import { useCallback } from "react";

interface CourseCardProps {
  course: Course;
  onOpenEdit: () => void;
  reload: (page: number) => void;
  actualPage: number;
}

export default function CourseCard({
  course,
  onOpenEdit,
  reload,
  actualPage,
}: CourseCardProps): JSX.Element {
  const { courseDescription, name, credits } = course;

  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    query: { userId },
  } = router;

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
            Creditos: {credits}
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
            // onClick={() => { dispatch(setSelectedCourse(course)); onOpenEdit(); }}
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
