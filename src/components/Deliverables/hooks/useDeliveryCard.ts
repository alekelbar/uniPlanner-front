import { globalContext } from "@/components/Layout/types/GlobalContext";
import { useAppDispatch, useAppSelector } from "@/redux";
import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect } from "react";
import { deliveryPageContext } from "../context/DeliveryPageContext";
import { Deliverable } from "@/interfaces/deliveries.interface";
import { parseISO } from "date-fns";
import { startLoadSetting } from "@/redux/thunks/settings-thunks";
import { RESPONSES } from "@/interfaces/response-messages";
import { confirmWithSweetAlert } from "@/helpers/swalConfirm";
import { startRemoveDelivery } from "@/redux/thunks/deliverables-thunks";
import {
  ColorMatrixPreferences,
  getPriorityColor,
} from "@/components/Career/helpers/priorityCalc";

export const useDeliveryCard = (deliverable: Deliverable) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { handleShowSnack } = useContext(globalContext);

  const {
    pagination: { beforeDelete },
  } = useContext(deliveryPageContext);

  const { deliverables } = useAppSelector((state) => state.deliveries);

  const { selected, loading } = useAppSelector((state) => state.setting);

  const {
    query: { userId, courseId },
  } = useRouter();

  let create_at: Date = new Date();

  if (deliverable.createdAt) {
    create_at = parseISO(deliverable.createdAt.toString());
  }

  const loadingUserSettings = useCallback(async () => {
    const response = await dispatch(startLoadSetting(userId as string));

    if (response.trim() === RESPONSES.INVALID_ID) {
      await router.push("/");
      return;
    }

    if (response !== RESPONSES.SUCCESS) {
      handleShowSnack(response);
    }
  }, [userId, dispatch, handleShowSnack, router]);

  useEffect(() => {
    // El usuario default(no user) tiene el ID por defecto.
    if (!selected.user) loadingUserSettings();
  }, [selected.user, loadingUserSettings]);

  const handleRemove = async () => {
    const confirmation = await confirmWithSweetAlert();
    if (confirmation.isConfirmed) {
      beforeDelete(deliverables);
      const response = await dispatch(
        startRemoveDelivery({
          ...deliverable,
          course: courseId as string,
        })
      );
      if (response !== RESPONSES.SUCCESS) {
        handleShowSnack(response);
      }
    }
  };

  const { importance, urgency } = deliverable;
  const { do: doing, delegate, ignore, prepare } = selected;

  const userMatrizColor: ColorMatrixPreferences = {
    delegate,
    do: doing,
    ignore,
    prepare,
  };

  const colorSeleted = getPriorityColor(importance, urgency, userMatrizColor);

  return {
    loading,
    colorSeleted,
    handleRemove,
    create_at,
    userId
  };
};
