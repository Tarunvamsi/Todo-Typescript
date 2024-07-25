import React, { useEffect, useState } from "react";
import { Todo } from "./types";
import useAddTask from "../hooks/useAddTask ";

interface CreateTaskProps {
  onAdd?: () => void;
  todoToEdit?: Todo | null;
  onEditComplete?: () => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  onAdd,
  todoToEdit,
  onEditComplete,
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];
  const { handleAddTask, error } = useAddTask({
    onAdd,
    onEditComplete,
    todoToEdit,
  });

  useEffect(() => {
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setDescription(todoToEdit.description);
      setDueDate(todoToEdit.dueDate ? todoToEdit.dueDate.split('T')[0] : '');
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  }, [todoToEdit, onEditComplete]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddTask(title, description, dueDate);
  };

  return (
    <div className="pt-32 flex flex-wrap justify-center">
      <form onSubmit={handleSubmit}>
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
        <button className="bg-blue-500 m-3 p-3 rounded-lg" type="submit">
          {todoToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
