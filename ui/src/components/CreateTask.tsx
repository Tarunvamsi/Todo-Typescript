import React, { useEffect, useState } from "react";

import { Todo } from "./types";

interface CreateTaskProps {
  onAdd?: () => void;
  todoToEdit?: Todo | null;
  onEditComplete?: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAdd, todoToEdit, onEditComplete }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    console.log('Todo to Edit:', todoToEdit); // Debugging line
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setDescription(todoToEdit.description);
      setDueDate(todoToEdit.dueDate || '');
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [todoToEdit]);

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!title || !description || !dueDate) {
      setError('All fields are required');
      return;
    }

    setError(null); 

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError('User is not authenticated');
        return;
      }

      const apiUrl = todoToEdit ? `http://localhost:3000/todos/${todoToEdit.id}` : "http://localhost:3000/todos";
      const method = todoToEdit ? 'PUT' : 'POST';
      console.log(todoToEdit?.id)
      const response = await fetch(apiUrl, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          description,
          completed: todoToEdit ? todoToEdit.completed : false,
          dueDate,
        }),
      });
      console.log("response", response)

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to ${todoToEdit ? 'update' : 'add'} task: ${response.status} - ${errorMessage}`);
      }

      if (todoToEdit && onEditComplete) {
        onEditComplete();
      } else if (onAdd) {
        onAdd();
      }

      setTitle("");
      setDescription("");
      setDueDate("");

    } catch (error) {
      console.error('Error:', error);
      setError('Failed to add/update task');
    }
  };

  return (
    <div className="pt-32 flex flex-wrap justify-center">
      <form onSubmit={handleAddTask}>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          className="border border-black m-3 p-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border border-black m-3 p-3"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="border border-black m-3 p-3"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
        />
        <button
          className="bg-blue-500 m-3 p-3 rounded-lg"
          type="submit"
        >
          {todoToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
