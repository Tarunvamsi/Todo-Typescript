import { useState } from "react";
import { Project, Todo } from "../components/types";
import { BASE_URL } from "../utils/constants";

const useGetProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const projectResponse = await response.json();
      console.log("projectResponse", projectResponse);
      setProjects(() => projectResponse);
    } catch (error) {
      console.error("Error fetching Projects:", error);
    }
  };

  return {
    projects,
    fetchProjects,
  };
};

export default useGetProjects;