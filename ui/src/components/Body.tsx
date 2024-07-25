import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { Todo } from "./types";
import Todos from "./Todos";
import useTodos from "../hooks/useTodos";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useCompleteTodo from "../hooks/useCompleteTodo";

const Body: React.FC = () => {
  const { todos, pendingCount, completedCount, fetchTodos } = useTodos();
  const { handleDelete, error: deleteError } = useDeleteTodo();
  const { handleComplete, error: completeError } = useCompleteTodo();
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleEdit = (todo: Todo) => {
    setTodoToEdit(todo);
  };

  const handleEditComplete = () => {
    setTodoToEdit(null);
    fetchTodos();
  };

  const handleCompleteTodo = async (id: string, isComplete: boolean) => {
    await handleComplete(id, isComplete);
    fetchTodos();
  };

  const handleDeleteTodo = async (id: string) => {
    await handleDelete(id);
    fetchTodos();
  };

  return (
    <div>
      <CreateTask
        onAdd={fetchTodos}
        todoToEdit={todoToEdit}
        onEditComplete={handleEditComplete}
      />
      {deleteError && <p className="text-red-500">{deleteError}</p>}
      {completeError && <p className="text-red-500">{completeError}</p>}
      <div className="m-5 p-3 border border-black flex">
        <div className="w-1/2 pr-2 border-r border-black">
          <h3 className="mb-2 text-orange-500 font-bold">
            Pending Todos ({pendingCount})
          </h3>
          <Todos
            todos={todos.filter((todo) => !todo.completed)}
            onComplete={handleCompleteTodo}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="mb-2 text-green-500 font-bold">
            Completed Todos ({completedCount})
          </h3>
          <Todos
            todos={todos.filter((todo) => todo.completed)}
            onComplete={handleCompleteTodo}
            onDelete={handleDeleteTodo}
            onEdit={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Body;
