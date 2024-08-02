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

const Todos: React.FC<TodosProps> = ({ todos, onComplete, onDelete, onEdit }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "No due date";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  const checkDate = (dueDate?: string) => {
    if (!dueDate) return 'noDueDate';
    const dateCompared = new Date(dueDate);
    dateCompared.setHours(0, 0, 0, 0); 

    if (dateCompared < today) {
      return 'pastDue';
    } else if (dateCompared.getTime() === today.getTime()) {
      return 'dueToday';
    } else {
      return 'futureDue';
    }
  };

  return (
    <div>
      {todos.length === 0 ? (
        <p className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-semibold text-lg p-4 rounded-lg shadow-md animate-bounce">
          No todos available!
        </p>
      ) : (
        todos.map((todo) => {
          const dateStatus = checkDate(todo.dueDate);
          const isCompleted = todo.completed;

          let bgColor = "bg-gradient-to-r from-green-600 to-indigo-900"; // Default for completed todos
          if (!isCompleted) {
            if (dateStatus === 'pastDue') {
              bgColor = "bg-gradient-to-r from-red-600 to-indigo-900";
            } else if (dateStatus === 'dueToday') {
              bgColor = "bg-gradient-to-r from-orange-600 to-indigo-900";
            } else if (dateStatus === 'futureDue') {
              bgColor = "bg-gradient-to-r from-pink-600 to-indigo-900";
            }
          }

          return (
            <div className={`px-4 py-2 mb-2 rounded-lg shadow-md ${bgColor}`} key={todo.id}>
              <div className="w-full flex justify-between">
                <div className="text-white flex flex-col justify-between">
                  <h1 className="font-semibold text-lg">{todo.title}</h1>
                  <h2>{todo.description}</h2>
                  <p>Due Date: {formatDate(todo.dueDate)}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    className={`p-2 m-1 rounded-lg bg-gray-300 hover:bg-white ${
                      isCompleted ? "hover:text-orange-500" : "hover:text-green-500"
                    }`}
                    onClick={() => onComplete(todo.id, todo.completed)}
                  >
                    {isCompleted ? "Undo" : "Done"}
                  </button>
                  <div className="flex gap-4 flex-wrap">
                    {!isCompleted && (
                      <button onClick={() => onEdit(todo)}>
                        <EditIcon />
                      </button>
                    )}
                    <button onClick={() => onDelete(todo.id)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Todos;
