import CoursesPage from "@/components/Courses/CoursePage";
import { isValidToken } from "@/helpers/isValidToken";
import { Stack } from "@mui/material";
import { GetServerSideProps } from "next";

export default function Page() {
  return (
    <Stack direction="column" sx={{ borderRadius: ".8em" }}>
      <CoursesPage>
        <CoursesPage.HeroPagination />
        <CoursesPage.Grid />
        <CoursesPage.AddButton />
        <CoursesPage.AddForm />
      </CoursesPage>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = ctx.req.cookies;
  return !token || !(await isValidToken(JSON.parse(token).token))
    ? {
        redirect: {
          destination: "/auth",
          permanent: false,
        },
      }
    : {
        props: {},
      };
};
