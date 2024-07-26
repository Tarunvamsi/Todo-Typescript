import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";

const useCompleteTodo = () => {
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (id: string, isCompleted: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !isCompleted }),
      });

      if (response.ok) {
        console.log("Completed todo");
        toast.info("Todo status updated !",{closeOnClick:true,autoClose:2000})
      } else {
        const result = await response.json();
        console.error("Failed to mark todo as completed:", result);
        setError(result.message);
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      setError((error as Error).message);
    }
  };

  return { handleComplete, error };
};

export default useCompleteTodo;
