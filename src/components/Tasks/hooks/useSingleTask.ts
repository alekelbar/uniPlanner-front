import { Task } from "@/interfaces/task-interface";
import { TaskService } from "@/services/Task";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

interface TaskFetch {
  data: null | Task;
  loading: boolean;
}

export const useSingleTask = () => {
  const {
    query: { edit },
  } = useRouter();

  const [data, setData] = useState<TaskFetch>({
    data: null,
    loading: true,
  });

  const getTask = useCallback(async () => {
    const response = await new TaskService().getOneById(edit as string);

    if (response.status === 200) {
      setData({
        data: response.data,
        loading: false,
      });
    }
    // todo bien...
  }, [edit]);

  useEffect(() => {
    getTask();
  }, [getTask]);

  return data;
};
