import React from 'react';

interface Todo {
  _id: string; // Ensure you use _id if this is what the backend uses
  title: string;
  description: string;
  completed: boolean;
}

interface TodosProps {
  todos: Todo[];
  onComplete: (id: string) => void;
}

const Todos: React.FC<TodosProps> = ({ todos, onComplete }) => {
  return (
    <div>
      {todos.map((todo) => (
        <div className='border border-black p-4 w-1/2' key={todo._id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button
            className={`p-2 rounded-lg ${todo.completed ? 'bg-green-600' : 'bg-red-600'}`}
            onClick={() => onComplete(todo._id)}
          >
            {todo.completed ? "Completed" : "Mark as Completed"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Todos;
