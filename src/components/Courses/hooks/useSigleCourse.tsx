import { Course } from "@/interfaces/course.interface";
import { CourseService } from "@/services/Course";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface CourseFetch {
  data: null | Course;
  loading: boolean;
}

export const useSigleCourse = () => {
  const {
    query: { edit },
  } = useRouter();

  const [data, setData] = useState<CourseFetch>({
    data: null,
    loading: true,
  });

  const getCourse = async (id: string) => {
    const response = await new CourseService().getCourseById(id as string);

    if (response.status === 200) {
      setData({
        data: response.data,
        loading: false,
      });
    }
  };

  useEffect(() => {
    getCourse(edit as string);
  }, [edit]);

  return data;
};
