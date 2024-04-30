import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import api from "../../../services/api/auth/axios";
import { Endpoints } from "../../../constants/endpoints";
import { getStorage } from "../../../utils/storage";

interface ICommentData {
  id: number;
  text: string;
  event_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
  };
}

export const useComments = (id: string) => {
  const [comments, setComments] = useState<ICommentData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const userId = getStorage("user_id");

  const getComments = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`${Endpoints.Event}/${id}/comments`);
      setComments(data.comments);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const addComment = async () => {
    try {
      setLoading(true);
      await api.post(Endpoints.Comment, { text: commentText, event_id: id });
      await getComments();
      setCommentText("");
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };
  const handleComment = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleKeyPress = async (event: KeyboardEvent<HTMLElement>) => {
    if ((event as any).key === "Enter") {
      await addComment();
    }
  };

  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [id]);

  return {
    userId,
    loading,
    comments,
    addComment,
    commentText,
    handleComment,
    handleKeyPress,
  };
};
