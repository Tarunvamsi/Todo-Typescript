import { useRef } from "react";

interface CreateTaskProps {
  onAdd?: () => void; // Optional callback
}

const CreateTask: React.FC<CreateTaskProps> = ({ onAdd }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  // Handle task creation
  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission

    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    try {
      const response = await fetch("http://localhost:3000/todo", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          completed: false,
        }),
      });

      if (response.ok) {
        alert("To do added");
        if (titleRef.current) titleRef.current.value = "";
        if (descriptionRef.current) descriptionRef.current.value = "";

        // Notify parent component to refresh todos
        if (onAdd) onAdd();
      } else {
        alert("Failed to add todo");
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding todo');
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

        <button
          className="bg-blue-500 m-3 p-3 rounded-lg"
          type="submit"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
