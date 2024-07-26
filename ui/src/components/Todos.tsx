import React from "react";
import EditIcon from "../assets/icons/EditIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";
import { Todo } from "./types";

interface TodosProps {
  todos: Todo[];
  onComplete: (id: string, isComplete: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const Todos: React.FC<TodosProps> = ({
  todos,
  onComplete,
  onDelete,
  onEdit,
}) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  return (
    <div>
      {todos.length === 0 ? (
        <p className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold text-lg p-4 rounded-lg shadow-md animate-bounce">
          No todos available !
        </p>
      ) : (
        todos.map((todo) => (
          <div
            className={`border border-black p-4 mb-2 rounded-lg shadow-md ${
              todo.completed
                ? "bg-gradient-to-r from-slate-300 to-green-300 shadow-yellow-600"
                : "bg-gradient-to-r from-slate-300 to-orange-200 shadow-violet-600"
            }`}
            key={todo.id}
          >
            <h1 className="font-semibold text-lg">{todo.title}</h1>
            <h2>{todo.description}</h2>
            <p>Due Date: {formatDate(todo.dueDate)}</p>
            <button
              className={`p-2 m-1 rounded-lg ${
                todo.completed
                  ? "bg-orange-300 hover:bg-orange-400"
                  : "bg-green-300 hover:bg-green-400"
              }`}
              onClick={() => onComplete(todo.id, todo.completed)}
            >
              {todo.completed ? "Move to pending" : "Mark as Completed"}
            </button>
            {todo.completed ? (
              <>
                <button
                  className="p-2 rounded-lg m-1"
                  onClick={() => onDelete(todo.id)}
                >
                  <DeleteIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className="p-2 m-2 rounded-lg"
                  onClick={() => onEdit(todo)}
                >
                  <EditIcon />
                </button>
                <button
                  className="p-2 rounded-lg"
                  onClick={() => onDelete(todo.id)}
                >
                  <DeleteIcon />
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Todos;
