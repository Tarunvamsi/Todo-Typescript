import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import { Todo } from "./types";
import Todos from "./Todos";

const Body: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/todos", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      const json = await response.json();
      console.log("Fetched Todos:", json); // Debugging line     
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
    
    calculateSummary(todos);
  },[]);

  const handleComplete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${id}/completed`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({ completed: true }),
        }
      );
  
      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? updatedTodo : todo
          )
        );
        calculateSummary(
          todos.map((todo) =>
            todo.id === id ? updatedTodo : todo
          )
        );
      } else {
        const result = await response.json();
        console.error("Failed to mark todo as completed:", result);
      }
    } catch (error) {
      console.error("Error marking todo as completed:", error);
    }
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    console.log('Editing Todo:', todo);
    setTodoToEdit(todo);
  };

  const handleEditComplete = () => {
    setTodoToEdit(null);
    fetchTodos();
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const result = await response.json();
        console.log(result.msg);
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== id)
        );
      } else {
        const result = await response.json();
        console.error("Failed to delete todo:", result);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    fetchTodos();
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