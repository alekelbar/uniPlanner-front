import { GetServerSideProps } from "next";
import { isValidToken } from "@/helpers/isValidToken";
import { TasksPage } from "@/components/Tasks/TaskPage";
import { checkQueryParams } from "@/helpers/checkQueryParams";

export default function Page(): JSX.Element {
  return (
    <TasksPage>
      <TasksPage.PaginationHero />
      <TasksPage.Grid />
      <TasksPage.FloatButton />
      <TasksPage.AddForm />
      <TasksPage.TimerClock />
    </TasksPage>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (checkQueryParams(ctx))
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

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
