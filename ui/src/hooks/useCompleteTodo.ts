import { useState } from "react";
import { BASE_URL } from "../utils/constants";

const useCompleteTodo = () => {
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async (id: string, isCompleted: boolean) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/todos/${id}/completed/${!isCompleted}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: true }),
        }
      );

      if (response.ok) {
        console.log("Completed todo");
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
