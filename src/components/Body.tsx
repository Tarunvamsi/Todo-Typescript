import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import Todos from "./Todos";

// Ensure you use _id if this is what the backend uses
interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

const Body: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const json = await response.json();
      setTodos(json);
      calculateSummary(json);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const calculateSummary = (todos: Todo[]) => {
    const pending = todos.filter((todo) => !todo.completed).length;
    const completed = todos.filter((todo) => todo.completed).length;
    setPendingCount(pending);
    setCompletedCount(completed);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleComplete = async (_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${_id}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }),
        }
      );

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map((todo) => (todo._id === _id ? updatedTodo : todo)));
        calculateSummary(
          todos.map((todo) => (todo._id === _id ? updatedTodo : todo))
        );
      } else {
        const result = await response.json();
        console.error("Failed to mark todo as completed:", result);
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
  };

  const handleEdit = (todo: Todo) => {
    setTodoToEdit(todo);
  };

  const handleEditComplete = () => {
    setTodoToEdit(null);
    fetchTodos();
  };

  const handleDelete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.msg);
        setTodos(todos.filter((todo) => todo._id !== _id));
      } else {
        const result = await response.json();
        console.error("Failed to delete todo:", result);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <CreateTask
        onAdd={fetchTodos}
        todoToEdit={todoToEdit}
        onEditComplete={handleEditComplete}
      />
      <div className="m-5 p-3 border border-black w-1/2">
        <h3 className="mb-2">Summary</h3>
        <p>Pending Todos: {pendingCount}</p>
        <p>Completed Todos: {completedCount}</p>
      </div>
      <Todos
        todos={todos}
        onComplete={handleComplete}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Body;
