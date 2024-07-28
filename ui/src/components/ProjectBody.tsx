import React, { useEffect, useState } from "react";
import useGetProjects from "../hooks/useGetProjects";
import CreateProjects from "./CreateProjects";
import Projects from "./Projects";
import { Project } from "./types";

const ProjectBody: React.FC = () => {
  const { projects, fetchProjects } = useGetProjects();
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
  };

  const handleEditComplete = () => {
    setProjectToEdit(null);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="flex justify-center mt-28">
      <div className="p-2 m-2 max-w-screen-sm bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-red-900 shadow-md rounded-lg mx-auto">
        <CreateProjects
          onAdd={fetchProjects}
          projectToEdit={projectToEdit}
          onEditComplete={handleEditComplete}
        />
      </div>
      </div>

      <div className="text-white">
        <Projects projects={projects} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default ProjectBody;
