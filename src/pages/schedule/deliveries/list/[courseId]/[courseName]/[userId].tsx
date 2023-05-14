import { GetServerSideProps } from "next";
import { isValidToken } from "@/helpers/isValidToken";
import { DeliveryPage } from "@/components/Deliverables/DeliveryPage";
import { checkQueryParams } from "@/helpers/checkQueryParams";

export default function Page(): JSX.Element {
  return (
    <DeliveryPage>
      <DeliveryPage.Grid />
      <DeliveryPage.FloatAddButton />
      <DeliveryPage.AddForm />
      <DeliveryPage.FloatViewButton />
      <DeliveryPage.PaginationHero />
    </DeliveryPage>
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
