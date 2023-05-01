import { EditDelivery } from "@/components/Deliverables/EditDelivery";
import { useSingleDelivery } from "@/components/Deliverables/hooks/useSingleDelivery";
import { Loading } from "@/components/common/Loading";
import { Deliverable } from "@/interfaces/deliveries.interface";
import { useRouter } from "next/router";
import React from "react";

const Page = () => {
  const { data, loading } = useSingleDelivery();

  if (loading || !data) return <Loading called="EditDelivery" />;

  return <EditDelivery delivery={data} />;
};

export default Page;
