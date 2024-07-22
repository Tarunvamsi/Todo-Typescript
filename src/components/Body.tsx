import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import Todos from "./Todos";

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
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === _id ? updatedTodo : todo
          )
        );
        calculateSummary(
          todos.map((todo) =>
            todo._id === _id ? updatedTodo : todo
          )
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
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo._id !== _id)
        );
      } else {
        const result = await response.json();
        console.error("Failed to delete todo:", result);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      <CreateTask
        onAdd={fetchTodos}
        todoToEdit={todoToEdit}
        onEditComplete={handleEditComplete}
      />
      <div className="m-5 p-3 border border-black flex">
        <div className="w-1/2 pr-2 border-r border-black">
          <h3 className="mb-2 text-orange-500 font-bold">Pending Todos ({pendingCount})</h3>
          <Todos
            todos={pendingTodos}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="mb-2 text-green-500 font-bold">Completed Todos ({completedCount})</h3>
          <Todos
            todos={completedTodos}
            onComplete={() => {}}
            onDelete={handleDelete}
            onEdit={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;

