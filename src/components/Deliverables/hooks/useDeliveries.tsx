import { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import isInteger from '../../../../src/helpers/isInteger';
import usePagination from '../../../hooks/usePagination';
import { RESPONSES } from '../../../../src/interfaces/response-messages';
import { useAppDispatch, useAppSelector } from '../../../../src/redux';
import { startLoadDeliveries } from '../../../../src/redux/thunks/deliverables-thunks';
import { useRouter } from 'next/router';


export const useDeliveries = () => {
  const dispatch = useAppDispatch();

  const { query: { courseId } } = useRouter();

  const { deliverables, count, loading } = useAppSelector(st => st.deliveries);

  const {
    actualPage,
    handleChangePage,
    totalPages,
    setTotalPages,
  } = usePagination(count);

  // Manejo de estado de los modales...
  const [openCreate, setOpenCreate] = useState(false);

  const onOpenCreate = () => {
    setOpenCreate(true);
  };

  const onCloseCreate = () => {
    setOpenCreate(false);
  };

  const [openEdit, setOpenEdit] = useState(false);

  const onOpenEdit = () => {
    setOpenEdit(true);
  };

  const onCloseEdit = () => {
    setOpenEdit(false);
  };

  const reload = useCallback(async (page: number = 1) => {
    const response = await dispatch(startLoadDeliveries(courseId as string, page));
    if (response !== RESPONSES.SUCCESS) {
      await Swal.fire(response);
    }
  }, [courseId, dispatch]);

  useEffect(() => {
    reload(actualPage);
  }, [actualPage, reload]);

  useEffect(() => {
    if (deliverables.length === 0 && actualPage > 1) {
      reload(actualPage - 1);
    }

    if (deliverables.length > 5) {
      reload(actualPage);
    }

    // Cálculo para la paginación
    const pages: number =
      isInteger(count / 5)
        ? count / 5
        : Math.floor(count / 5) + 1;

    setTotalPages(pages);

  }, [deliverables, actualPage, count, reload, setTotalPages]);

  return {
    deliveriesState: {
      deliverables,
      loading,
      reload
    },
    pagination: {
      actualPage,
      handleChangePage,
      totalPages,
    },
    dialogHandler: {
      openCreate,
      openEdit,
      onCloseCreate,
      onOpenCreate,
      onCloseEdit,
      onOpenEdit
    }
  };
};
