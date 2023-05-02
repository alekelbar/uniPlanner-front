import { Deliverable } from "@/interfaces/deliveries.interface";
import { DeliverableService } from "@/services/Deliveries";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

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

    if (response.status === 200) {
      setData({
        data: response.data,
        loading: false,
      });
    }
    // todo bien...
  }, [edit]);

  useEffect(() => {
    getDelivery();
  }, [getDelivery]);

  return data;
};
