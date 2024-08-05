import React, { useEffect, useState } from "react";
import useGetProjects from "../hooks/useGetProjects";
import CreateProject from "../components/CreateProject";
import ProjectList from "../components/ProjectList";
import { Project } from "../components/types";
import Dropdown from "../components/Dropdown";
import useDeleteProject from "../hooks/useDeleteProject";

const Dashboard: React.FC = () => {
  const { projects, fetchProjects } = useGetProjects();
  const { handleDelete, error: deleteError } = useDeleteProject();

  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

  const handleEdit = (project: Project) => {
    setProjectToEdit(project);
  };

  const handleDeleteProject = async (id: string) => {
    await handleDelete(id);
    fetchProjects();
  };

  const handleEditComplete = () => {
    setProjectToEdit(null);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (selectedOption: any) => {
    if (selectedOption) {
      setFilteredProjects(
        projects.filter((project) =>
          project.title
            .toLowerCase()
            .includes(selectedOption.value.toLowerCase())
        )
      );
    } else {
      setFilteredProjects(projects);
    }
  };

  const options = projects.map((project) => ({
    value: project.title,
    label: project.title,
  }));

  return (
    <div>
      <div className="flex justify-center mt-28">
        <div className="p-2 m-2 max-w-screen-sm bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-gray-300 shadow-sm rounded-lg mx-auto">
          <CreateProject
            onAdd={fetchProjects}
            projectToEdit={projectToEdit}
            onEditComplete={handleEditComplete}
          />
        </div>
      </div>

      <div className="text-white">
        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-gray-300 shadow-sm m-4 p-4 rounded-md max-w-4xl mx-auto">
          <Dropdown options={options} handleSearch={handleSearch} />
          <ProjectList projects={filteredProjects} onEdit={handleEdit} onDelete={handleDeleteProject} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
