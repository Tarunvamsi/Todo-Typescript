import React from "react";
import { Project } from "./types";
import { useNavigate } from "react-router";
import EditIcon from "../assets/icons/EditIcon";

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects = [], onEdit }) => {
  const navigate = useNavigate();

  return (
    <div>
      <section className="h-[400px] overflow-y-auto p-4 mt-4">
        <div className="flex flex-col items-center">
          {projects.map((project) => (
            <div key={project.title} className="mb-4 w-full">
              <div className="flex items-center">
                <h1
                  className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out w-full"
                  onClick={() =>
                    navigate(`/projects/${project.id}`, {
                      state: { ...project },
                    })
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

export default ProjectList;
