import { Course } from "../../interfaces/course.interface";
import { RESPONSES } from "../../interfaces/response-messages";
import { CourseService } from "../../services/Course/course-service";
import {
  addCourse,
  removeCourse,
  setCourses,
  startLoadingCourses,
  stopLoadingCourses,
  updateCourse,
} from "../slices/Courses/coursesSlice";
import { AppDispatch, RootState } from "../store";

export const startLoadCourses = (careerId: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());
    const {
      auth: { user },
    } = getState();

    const service = new CourseService();
    const response = await service.getAll(user.id, careerId);

    if (response.status !== 200) {
      dispatch(stopLoadingCourses());
      return response;
    }

    const { data } = response;
    dispatch(setCourses(data));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};

export const startRemoveCourse = (course: Course) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());

    const service = new CourseService();
    const response = await service.removeCourse(course);

    const { data } = response;
    if (response.status !== 200) {
      dispatch(stopLoadingCourses());
      return response;
    }

    dispatch(removeCourse(data));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};

export const startAddCourse = (createdCourse: Course) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    dispatch(startLoadingCourses());

    const service = new CourseService();
    const response = await service.createCourse(createdCourse);

    if (response.status !== 201) {
      dispatch(stopLoadingCourses());
      return response;
    }

    dispatch(addCourse(response.data));
    dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};

export const startUpdateCourse = (createCourse: Course, courseId: string) => {
  return async (dispatch: AppDispatch) => {
    // cargando LOS CURSOS...
    // dispatch(startLoadingCourses());

    const service = new CourseService();
    const course: Course = createCourse;

    const response = await service.updateCourse(course, courseId);

    const { data } = response;
    if (response.status !== 200) {
      // dispatch(stopLoadingCourses());
      return response;
    }

    dispatch(updateCourse(data));
    // dispatch(stopLoadingCourses());
    return RESPONSES.SUCCESS;
  };
};
