import { Deliverable } from "@/interfaces/deliveries.interface";
import { DeliverableService } from "@/services/Deliveries";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface DeliveryFetch {
  data: null | Deliverable;
  loading: boolean;
}

export const useSingleDelivery = () => {
  const {
    query: { edit },
  } = useRouter();

  const [data, setData] = useState<DeliveryFetch>({
    data: null,
    loading: true,
  });

  const getDelivery = useCallback(async () => {
    const response = await new DeliverableService().getOneById(edit as string);

    if (response.status !== 200) {
      await Swal.fire(response);
    }
    // todo bien...
    setData({
      data: response.data,
      loading: false,
    });
  }, [edit]);

  useEffect(() => {
    getDelivery();
  }, [getDelivery]);

  return data;
};
