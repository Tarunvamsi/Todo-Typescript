import AddTask from "./AddTask";

interface TodoProp {
  task: string;
}

const CreateTask = (props: TodoProp) => {

  
  return (
    <div>
      <AddTask />
      <h1 className="text-red-500">{props.task}</h1>
    </div>
  );
};

export default CreateTask;
