import { EditCourse } from "@/components/Courses/EditCourse";
import { useSigleCourse } from "@/components/Courses/hooks/useSigleCourse";
import { Loading } from "@/components/common/Loading";
import { Course } from "@/interfaces/course.interface";
import { useRouter } from "next/router";

const Page = () => {
  const { data, loading } = useSigleCourse();

  if (loading || !data) return <Loading called="EditCourse" />;

  return (
    // secure use casting...
    <EditCourse course={data} />
  );
};

export default Page;
