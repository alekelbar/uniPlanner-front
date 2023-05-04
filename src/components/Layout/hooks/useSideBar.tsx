import React, { useRef } from "react";
import { useAppSelector } from "../../../redux";

export const useSideBar = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAppSelector((state) => state.auth);

  const drawerRef = useRef<HTMLDivElement>(null);

  return {
    user,
    drawerRef,
  };
};
