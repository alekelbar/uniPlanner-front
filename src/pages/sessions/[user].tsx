import { GetServerSideProps } from "next";
import { isValidToken } from "@/helpers/isValidToken";
import SessionsPage from "@/components/Sessions/SessionPage";
import { checkQueryParams } from "@/helpers/checkQueryParams";

export default function Page(): JSX.Element {
  return (
    <SessionsPage>
      <SessionsPage.Pagination />
      <SessionsPage.Grid />
      <SessionsPage.AddButton />
      <SessionsPage.AddDialog />
      <SessionsPage.Timer />
    </SessionsPage>
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
