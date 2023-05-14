import { EditTask } from "@/components/Tasks/EditTask";
import { useSingleTask } from "@/components/Tasks/hooks/useSingleTask";
import { Loading } from "@/components/common/Loading";

const Page = () => {
  const { data, loading } = useSingleTask();
  if (loading || !data) return <Loading called="EditDelivery" />;

  return <EditTask task={data} />;
};

export default Page;
