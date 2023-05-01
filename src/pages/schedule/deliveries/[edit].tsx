import { EditDelivery } from "@/components/Deliverables/EditDelivery";
import { useSingleDelivery } from "@/components/Deliverables/hooks/useSingleDelivery";
import { Loading } from "@/components/common/Loading";
import { Deliverable } from "@/interfaces/deliveries.interface";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const data = useSingleDelivery();
  if (data.loading) return <Loading called="EditDelivery" />;

  return <EditDelivery delivery={data.data as Deliverable} />;
};

export default Page;
