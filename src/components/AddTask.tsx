import { useRef, useState } from "react";

const AddTask = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const inputTask = useRef<HTMLInputElement>(null);
  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputTask.current) {
      const taskValue = inputTask.current.value.trim();
      if (taskValue !== "") {
        setTasks([...tasks, taskValue]);
        inputTask.current.value = "";
      }
    }
  };
  return (
    <div className="pt-32 flex flex-wrap justify-center">
      <form onSubmit={handleAddTask}>
        <input
          ref={inputTask}
          type="text"
          className="border border-black m-3 p-3 "
        />
        <button className="bg-blue-500 m-3 p-3 rounded-lg" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
