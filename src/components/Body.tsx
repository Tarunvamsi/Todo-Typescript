import { useState, useEffect } from 'react';
import CreateTask from './CreateTask';
import Todos from './Todos';

interface Todo {
  _id: string; // Ensure you use _id if this is what the backend uses
  title: string;
  description: string;
  completed: boolean;
}

const Body: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/todos');
      const json = await response.json();
      setTodos(json);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleComplete = async (_id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${_id}/complete`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: true }),
      });

      if (response.ok) {
        const updatedTodo = await response.json();
        setTodos(todos.map(todo => todo._id === _id ? updatedTodo : todo));
      } else {
        const result = await response.json();
        console.error('Failed to mark todo as completed:', result);
      }
    } catch (error) {
      console.error('Error marking todo as completed:', error);
    }
  };

  return (
    <div>
      <CreateTask onAdd={fetchTodos} />
      <Todos todos={todos} onComplete={handleComplete} />
    </div>
  );
};

export default Body;
