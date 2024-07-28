import React, { useState, useEffect } from "react";
import { Project } from "./types";
import useGetProjects from "../hooks/useGetProjects";
import { useNavigate } from "react-router";
import EditIcon from "../assets/icons/EditIcon";
import Select from 'react-select';


interface ProjectProps {
  projects: Project[];
  onEdit: (project: Project) => void;

}


const Projects: React.FC<ProjectProps> = ({ projects = [],onEdit }) => {
  const { fetchProjects } = useGetProjects();
  const navigate = useNavigate();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);

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
    <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-red-900 shadow-md m-4 p-4 rounded-md max-w-4xl mx-auto">
  <div className="w-full">
    <Select
      options={options}
      onChange={handleSearch}
      isClearable
      placeholder="Search projects..."
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-black shadow-lg border-2 border-gray-300 rounded-lg focus:border-indigo-500"
    />
  </div>
  
  <section className="h-[400px] overflow-y-auto p-4 mt-4">
    <div className="flex flex-col items-center">
      {filteredProjects.map((project) => (
        <div key={project.title} className="mb-4 w-full">
          <div className="flex items-center">
            <h1
              className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out w-full"
              onClick={() =>
                navigate(`/projects/${project.id}`, { state: { ...project } })
              }
            >
              {project.title}
            </h1>
            <button
              className="p-2 m-2 rounded-lg"
              onClick={() => onEdit(project)}
            >
              <EditIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  </section>
</div>


  );
};

export default Projects;
