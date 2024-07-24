import React, { useRef, useEffect, useState } from "react";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string;
}

interface CreateTaskProps {
  onAdd?: () => void;
  todoToEdit?: Todo | null;
  onEditComplete?: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAdd, todoToEdit, onEditComplete }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const today = new Date().toISOString().split('T')[0];
  useEffect(() => {
    if (todoToEdit) {
      titleRef.current!.value = todoToEdit.title;
      descriptionRef.current!.value = todoToEdit.description;
      dateRef.current!.value = todoToEdit.date || '';
    } else {
      titleRef.current!.value = '';
      descriptionRef.current!.value = '';
      dateRef.current!.value = '';
    }
  }, [todoToEdit]);

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();

    const title = titleRef.current?.value.trim();
    const description = descriptionRef.current?.value.trim();
    const date = dateRef.current?.value;

    if (!title || !description || !date) {
      setError('All fields are required');
      return;
    }

    setError(null); // Clear any previous errors

    try {
      if (todoToEdit) {
        await fetch(`http://localhost:3000/todos/${todoToEdit._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            completed: todoToEdit.completed,
            date,
          }),
        });

        if (onEditComplete) onEditComplete();
      } else {
        await fetch("http://localhost:3000/todo", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            completed: false,
            date,
          }),
        });

        if (onAdd) onAdd();
      }

      titleRef.current!.value = "";
      descriptionRef.current!.value = "";
      dateRef.current!.value = "";
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="pt-32 flex flex-wrap justify-center">
      <form onSubmit={handleAddTask}>
        {error && <p className="text-red-600">{error}</p>}
        <input
          ref={titleRef}
          type="text"
          className="border border-black m-3 p-3"
          placeholder="title"
        />
        <input
          ref={descriptionRef}
          type="text"
          className="border border-black m-3 p-3"
          placeholder="description"
        />
        <input
          ref={dateRef}
          type="date"
          className="border border-black m-3 p-3"
          placeholder="due date"
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
