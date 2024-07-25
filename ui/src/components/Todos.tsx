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
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        todos.map((todo) => (
          <div className="border border-black p-4 mb-2" key={todo.id}>
            <h1 className="font-semibold text-lg">{todo.title}</h1>
            <h2>{todo.description}</h2>
            <p>Date: {todo.dueDate}</p>
            <button
              className={`p-2 m-1 rounded-lg ${
                todo.completed ? "bg-green-500" : "bg-gray-300"
              }`}
              onClick={() => onComplete(todo.id, todo.completed)}
            >
              {todo.completed ? "Move to pending" : "Mark as Completed"}
            </button>
            {todo.completed ? (
              <>
                <button
                  className="p-2 rounded-lg  m-1"
                  onClick={() => onDelete(todo.id)}
                >
                  <DeleteIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  className="p-2 m-2 rounded-lg "
                  onClick={() => onEdit(todo)}
                >
                  <EditIcon />
                </button>
                <button
                  className="p-2 rounded-lg "
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
