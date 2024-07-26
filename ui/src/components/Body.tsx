import React, { useEffect, useState } from "react";
import CreateTask from "./CreateTask";
import { Todo } from "./types";
import Todos from "./Todos";
import useTodos from "../hooks/useTodos";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useCompleteTodo from "../hooks/useCompleteTodo";
import {
  downloadMarkdownFile,
  generateMarkdown,
} from "../utils/exportToMarkdown"; // Import the utility function
import Download from "../assets/icons/Download";
import { createSecretGist } from "../utils/octokit";

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

  const handleExport = () => {
    downloadMarkdownFile("Todo's Summary", todos);
  };

  const handleExportAsGist = async () => {
    const content = generateMarkdown("Project 1", todos);
    const gistUrl = await createSecretGist(content);
    window.open(gistUrl, "_blank");
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
      <div className="m-6 ml-[1350px]">
        <button
          onClick={handleExport}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-400"
        >
          <span>Summary</span>
          <Download />
        </button>
        <button
          onClick={handleExportAsGist}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-blue-400"
        >
          <span>Export as gist</span>
          <Download />
        </button>
      </div>
      <div className="m-5 p-3 border border-gray-500 shadow-md flex">
        <div className="w-1/2 pr-2 border-r border-white">
          <div className="flex items-center mb-2">
            <h3 className="text-orange-600 font-bold text-2xl flex-grow">
              Pending Todos ({pendingCount})
            </h3>
            {pendingCount === 0 && (
              <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
            )}
            {pendingCount >= 1 && (
              <span className="w-3 h-3 bg-red-500 rounded-full ml-2 animate-pulse"></span>
            )}
          </div>
          <div className="h-[27.5em] overflow-y-auto">
            <Todos
              todos={todos.filter((todo) => !todo.completed)}
              onComplete={handleCompleteTodo}
              onDelete={handleDeleteTodo}
              onEdit={handleEdit}
            />
          </div>
        </div>
        <div className="w-1/2 pl-2">
          <h3 className="mb-2 text-green-500 font-bold text-2xl">
            Completed Todos ({completedCount})
          </h3>
          <div className="h-[27.5em] overflow-y-auto">
            <Todos
              todos={todos.filter((todo) => todo.completed)}
              onComplete={handleCompleteTodo}
              onDelete={handleDeleteTodo}
              onEdit={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
