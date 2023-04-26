import { useRouter } from 'next/router';
import React, { useRef } from 'react';
import Swal from 'sweetalert2';
import { logOut } from '../../../helpers/local-storage';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { onLogOut } from '../../../redux/slices/auth/authSlice';


export const useSideBar = ({ onClose }: { onClose: () => void; }) => {
  const { user } = useAppSelector(state => state.auth);

  const drawerRef = useRef<HTMLDivElement>(null);

  const handleClose = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.clientX > 240) {
      onClose();
    }
  };

  return {
    user, drawerRef, handleClose
  };

};
