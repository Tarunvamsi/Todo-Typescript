import React from "react";

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
          <div className="border border-black p-4 w-1/2" key={todo._id}>
            <h1>{todo.title}</h1>
            <h2>{todo.description}</h2>
            <p>Date: {todo.date}</p>
            <button
              className={`p-2 rounded-lg ${todo.completed ? "bg-green-600" : "bg-red-600"}`}
              onClick={() => onComplete(todo._id)}
            >
              {todo.completed ? "Completed" : "Mark as Completed"}
            </button>
            <button
              className="p-2 rounded-lg bg-blue-600"
              onClick={() => onEdit(todo)}
            >
              Edit
            </button>
            <button
              className="p-2 rounded-lg bg-gray-600"
              onClick={() => onDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Todos;
