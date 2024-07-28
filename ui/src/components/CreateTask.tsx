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
    <div  >
      <div className="className= p-4 m-3 mt-28  w-3/4 ml-44  flex flex-wrap  bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600  shadow-red-900 shadow-md  rounded-lg">
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          className="border border-black m-3 p-3 w-96 rounded-md"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="border border-black m-3 p-3 w-72 rounded-md"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="border border-black m-3 p-3 w-56 rounded-md"
          placeholder="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          min={today}
        />
        <button className="bg-blue-500 m-3 p-3 rounded-lg w-24" type="submit">
          {todoToEdit ? "Update Task" : "Add Task"}
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateTask;
