import { CareerPage } from "@/components/Career/CareerPage";
import { checkQueryParams } from "@/helpers/checkQueryParams";
import { isValidToken } from "@/helpers/isValidToken";
import { GetServerSideProps } from "next";
import React from "react";

const Page: React.FC = () => {
  return (
    <CareerPage>
      <CareerPage.Grid />
      <CareerPage.FloatButton />
      <CareerPage.AddForm />
    </CareerPage>
  );
};

export default Page;

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
