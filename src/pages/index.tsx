// pages/index.tsx
import type { GetServerSideProps, NextPage } from "next";

import { Typography } from "@mui/material";
import { isValidToken } from "@/helpers/isValidToken";

const Home: NextPage = () => {
  return (
    <div>
      <Typography variant="h2" textAlign="center">
        Hello, World
      </Typography>
    </div>
  );
};

export default Home;

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