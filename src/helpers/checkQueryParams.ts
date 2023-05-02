import { GetServerSidePropsContext } from "next";

export const checkQueryParams = (ctx: GetServerSidePropsContext) => {
  const values = Object.values(ctx.query);
  return values.some((e) => e === undefined);
};
