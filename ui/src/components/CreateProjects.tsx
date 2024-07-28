import React, {  useEffect, useState } from "react";
import useAddProject from "../hooks/useAddProject";
import { Project } from "./types";

interface CreateProjectProps {
  onAdd: () => void;
  projectToEdit?: Project | null;
  onEditComplete?: () => void;
}

const CreateProjects: React.FC<CreateProjectProps> = ({
  onAdd,
  projectToEdit,
  onEditComplete
  
}) => {
  const [projectTitle, setProjectTitle] = useState<string>("");
  

  const { handleAddProject, error } = useAddProject({
    onAdd,
    onEditComplete,
    projectToEdit
  });

  useEffect(() => {
    if (projectToEdit) {
      setProjectTitle(projectToEdit.title);
    } else {
      setProjectTitle("");
    }
  }, [projectToEdit, onEditComplete]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleAddProject(projectTitle);
  };

  return (
    <div   >
      <div >
      <form onSubmit={handleSubmit}>
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          className="border border-black m-3 p-3 w-96 rounded-md"
          placeholder="Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />
        
        <button className="bg-blue-500 m-3 p-3 rounded-lg w-44" type="submit">
        {projectToEdit ? "Update Project" : "Add Project"}
        </button>
      </form>
      </div>
      
    </div>
  );  
};

export default CreateProjects;
