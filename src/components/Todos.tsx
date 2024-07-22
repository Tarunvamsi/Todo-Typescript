import React from "react";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

interface TodosProps {
  todos: Todo[];
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const Todos: React.FC<TodosProps> = ({ todos, onComplete, onDelete, onEdit }) => {
  return (
    <div>
      {todos.length === 0 ? (
        <p>No todos available</p>
      ) : (
        todos.map((todo) => (
          <div className="border border-black p-4 mb-2" key={todo._id}>
            <h1 className="font-semibold text-lg">{todo.title}</h1>
            <h2 >{todo.description}</h2>
            <p>Date: {new Date(todo.date).toLocaleDateString()}</p>
            <button
              className={`p-2 m-1 rounded-lg ${todo.completed ? "bg-green-600" : "bg-gray-300"}`}
              onClick={() => onComplete(todo._id)}
            >
              {todo.completed ? "Completed" : "Mark as Completed"}
            </button>
            {todo.completed ? (
              <>
                <button
                  className="p-2 rounded-lg  m-1"
                  onClick={() => onDelete(todo._id)}
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
                  onClick={() => onDelete(todo._id)}
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
