import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const useDeleteTodo = () => {
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log("Todo deleted successfully");
      } else {
        const result = await response.json();
        console.error("Failed to delete todo:", result);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      setError((error as Error).message);
    }
  };

  return { handleDelete, error };
};

export default useDeleteTodo;
