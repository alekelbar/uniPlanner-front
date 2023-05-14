import { Stack } from "@mui/material";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import { isValidToken } from "@/helpers/isValidToken";
import { SessionAddButton } from "./SessionAddButton";
import { SessionAddDialog } from "./SessionAddDialog";
import { SessionGrid } from "./SessionGrid";
import { SessionPagination } from "./SessionPagination";
import { useSession } from "@/components/Sessions/hooks/useSession";
import { SessionProvider } from "./context/SessionContext";
import { SessionTimer } from "./Timer";

export default function SessionsPage({
  children,
}: {
  children: ReactElement | ReactElement[];
}): JSX.Element {
  const sessionContext = useSession(2);

  return (
    <SessionProvider value={sessionContext}>
      <Stack direction="column" sx={{ borderRadius: ".8em" }}>
        {children}
      </Stack>
    </SessionProvider>
  );
}

SessionsPage.Pagination = SessionPagination;
SessionsPage.Grid = SessionGrid;
SessionsPage.AddButton = SessionAddButton;
SessionsPage.AddDialog = SessionAddDialog;
SessionsPage.Timer = SessionTimer;

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
