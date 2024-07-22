import React, { useRef, useEffect } from "react";

// Define the Todo type to match the structure used elsewhere
interface Todo {
  _id: string; // Use _id to match the backend schema
  title: string;
  description: string;
  completed: boolean;
  date?: string; // Optional date field
}

// Update the props to include optional todoToEdit and onEditComplete
interface CreateTaskProps {
  onAdd?: () => void;
  todoToEdit?: Todo | null; // Allow `null` for editing
  onEditComplete?: () => void; // Optional callback for when editing is complete
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAdd, todoToEdit, onEditComplete }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  // Populate form fields if editing an existing task
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

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const date = dateRef.current?.value;

    try {
      if (todoToEdit) {
        // Editing existing task
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
        // Adding new task
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
