import { GetServerSideProps } from "next";
import { isValidToken } from "@/helpers/isValidToken";
import { KanbanPage } from "@/components/Kanban/KanbanPage";

const Page = () => {
  return (
    <KanbanPage>
      <KanbanPage.lists />
      <KanbanPage.AddButton />
      <KanbanPage.AddDialog />
    </KanbanPage>
  );
};

export default Page;

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
