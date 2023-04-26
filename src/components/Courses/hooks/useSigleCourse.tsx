import { Course } from "@/interfaces/course.interface";
import { CourseService } from "@/services/Course";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface CourseFetch {
  data: null | Course;
  loading: boolean;
}

export const useSigleCourse = (edit: string) => {
  const router = useRouter();

  const [data, setData] = useState<CourseFetch>({
    data: null,
    loading: true,
  });

  const getCourse = useCallback(
    async (id: string) => {
      const response = await new CourseService().getCourseById(edit as string);

      if (response.status !== 200) {
        await Swal.fire(response);
        router.back();
      }
      // todo bien...
      setData({
        data: response.data,
        loading: false,
      });
    },
    [edit, router]
  );

  useEffect(() => {
    getCourse(edit as string);
  }, [edit, getCourse]);

  return data;
};
