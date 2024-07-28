import { useState } from "react";
import { Todo } from "../components/types";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router";
import { toast } from "react-toastify";

interface UseAddTaskProps {
  onAdd?: () => void;
  onEditComplete?: () => void;
  todoToEdit?: Todo | null;
}

const useAddTask = ({ onAdd, onEditComplete, todoToEdit }: UseAddTaskProps) => {
  const [error, setError] = useState<string | null>(null);
  const { projectId } = useParams();

  const handleAddTask = async (
    title: string,
    description: string,
    dueDate: string
  ) => {
    if (!title || !description || !dueDate) {
      setError("All fields are required");
      return;
    }

    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const apiUrl = todoToEdit
        ? `${BASE_URL}/todos/${todoToEdit.id}`
        : `${BASE_URL}/projects/${projectId}/todos`;
      const method = todoToEdit ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          completed: todoToEdit ? todoToEdit.completed : false,
          dueDate,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        toast.error(errorMessage);
      }else{
        toast.success("To do added Successfully")
      }

      if (todoToEdit && onEditComplete) {
        onEditComplete();
      } else if (onAdd) {
        onAdd();
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to add/update task");
    }
  };

  return { handleAddTask, error };
};

export default useAddTask;
