import { GetServerSideProps } from "next";
import { isValidToken } from "@/helpers/isValidToken";
import { DeliveryPage } from "@/components/Deliverables/DeliveryPage";

export default function Page(): JSX.Element {
  return (
    <DeliveryPage>
      <DeliveryPage.PaginationHero />
      <DeliveryPage.Grid />
      <DeliveryPage.FloatButton />
      <DeliveryPage.AddForm />
    </DeliveryPage>
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
