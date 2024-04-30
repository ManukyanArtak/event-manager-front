import { useCallback, useMemo, useState } from "react";
import {
  AddEventData,
  GetEventsResult,
} from "../../interfaces/event";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_EVENT,
  GET_EVENTS,
  UPDATE_EVENT,
} from "../../services/grphql/events/events";
import api from "../../services/api/auth/axios";
import { Endpoints } from "../../constants/endpoints";
import { toast } from "react-toastify";
import {
  CREATED_SUCCESSFULLY,
  DELETED_SUCCESSFULLY,
  SOMETHING_WENT_WRONG,
  UPDATED_SUCCESSFULLY,
} from "../../constants/messages";

export const useDashboard = () => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const [commentId, setCommentId] = useState<number | null>(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  const [addEvent] = useMutation(ADD_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const { data, refetch } =
    useQuery<GetEventsResult>(GET_EVENTS);

  const askDeleteEvent = (id: number): void => {
    setDeleteId(id);
  };

  const handleCloseDeleteModal = (): void => {
    setDeleteId(null);
  };

  const handleOpenEditModal = (id: number) => {
    setEditId(id);
  };

  const handleCloseEditModal = () => {
    setEditId(null);
  };

  const editItem = useMemo(() => {
    if (editId) {
      return data?.getEvents.find((event) => event.id === editId);
    }
    return null;
  }, [editId]);

  const handleAddEvent = useCallback(async (values: AddEventData) => {
    try {
      await addEvent({ variables: values });
      await refetch();
      toast.success(CREATED_SUCCESSFULLY);
    } catch (e) {
      toast.error(SOMETHING_WENT_WRONG);
    } finally {
      setOpenCreateModal(false);
    }
  }, []);

  const handleUpdateEvent = useCallback(
    async (values: AddEventData) => {
      try {
        await updateEvent({ variables: { ...values, id: editId } });
        await refetch();
        toast.success(UPDATED_SUCCESSFULLY);
      } catch (e) {
        toast.error(SOMETHING_WENT_WRONG);
      } finally {
        setEditId(null);
      }
    },
    [editId],
  );
  const handleToggleCreateModal = (open: boolean) => {
    setOpenCreateModal(open);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`${Endpoints.Event}/${deleteId}`);
      refetch();
      toast.success(DELETED_SUCCESSFULLY);
    } catch (e) {
      toast.error(SOMETHING_WENT_WRONG);
    } finally {
      setDeleteId(null);
    }
  };
  const handleOpenComment = (id: number) => {
    setCommentId(id);
  };
  const handleCloseComment = () => {
    setCommentId(null);
  };
  return {
    data,
    editId,
    deleteId,
    commentId,
    editItem,
    addEvent,
    updateEvent,
    handleDelete,
    handleAddEvent,
    askDeleteEvent,
    openCreateModal,
    handleUpdateEvent,
    handleOpenComment,
    handleCloseComment,
    handleOpenEditModal,
    handleCloseEditModal,
    handleCloseDeleteModal,
    handleToggleCreateModal,
  };
};
