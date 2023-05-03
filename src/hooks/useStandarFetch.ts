import { RESPONSES } from "@/interfaces/response-messages";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export const useStandarFetch = (cb: () => Promise<any>) => {
  const router = useRouter();
  const getData = async () => {
    
    const response = await cb();
    if (response.trim() === RESPONSES.INVALID_ID) {
      await router.push("/");
      return;
    }

    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  };
  return { getData };
};
