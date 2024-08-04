import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { useApi } from "./useApi";

const useDeleteTodo = () => {
  const [error, setError] = useState<string | null>(null);
  const { fetch } = useApi();

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
        toast.info("Todo deleted successfully!",{autoClose:2000,closeOnClick:true} )
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
