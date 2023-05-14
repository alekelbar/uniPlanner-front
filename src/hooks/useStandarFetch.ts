import { globalContext } from "@/components/Layout/types/GlobalContext";
import { RESPONSES } from "@/interfaces/response-messages";
import { useRouter } from "next/router";
import { useCallback, useContext } from "react";

export const useStandarFetch = (cb: () => Promise<any>) => {
  const router = useRouter();

  const { handleShowSnack } = useContext(globalContext);

  const getData = useCallback(async () => {
    const response = await cb();
    if (response.trim() === RESPONSES.INVALID_ID) {
      await router.push("/");
      return;
    }
    if (response !== RESPONSES.SUCCESS) {
      handleShowSnack(response);
    }
  }, [cb, handleShowSnack, router]);

  return { getData };
};
