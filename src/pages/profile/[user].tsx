import React from "react";
import ProfilePage from "@/components/Profile/profilePage";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { isValidToken } from "@/helpers/isValidToken";
import { checkQueryParams } from "@/helpers/checkQueryParams";

const Page: React.FC = () => {
  return <ProfilePage />;
};

export default Page;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
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
