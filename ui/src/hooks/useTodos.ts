import { useState } from "react";
import { Todo } from "../components/types";
import { BASE_URL } from "../utils/constants";

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const calculateSummary = (todos: Todo[]) => {
    const pending = todos.filter((todo) => !todo.completed).length;
    const completed = todos.filter((todo) => todo.completed).length;
    setPendingCount(pending);
    setCompletedCount(completed);
  };

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const todoResponse = await response.json();
      setTodos(() => todoResponse);
      calculateSummary(todoResponse);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  return {
    todos,
    pendingCount,
    completedCount,
    fetchTodos,
  };
};

export default useTodos;
