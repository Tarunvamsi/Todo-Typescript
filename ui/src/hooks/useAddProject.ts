import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-toastify";
import { Project } from "../components/types";
import { useApi } from "./useApi";

interface UseAddProjectProps {
  onAdd: () => void;
  onEditComplete?: () => void;
  projectToEdit?: Project | null;
}

const useAddProject = ({
  onAdd,
  onEditComplete,
  projectToEdit,
}: UseAddProjectProps) => {
  const [error, setError] = useState<string | null>(null);
  const { fetch } = useApi();

  const handleAddProject = async (title: string) => {
    if (!title) {
      toast.error("Please enter your project title!", {
        autoClose: 3000,
        closeOnClick: true,
      });
      return;
    }

    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("User is not authenticated");
        return;
      }

      const apiUrl = projectToEdit
        ? `${BASE_URL}/projects/${projectToEdit.id}`
        : `${BASE_URL}/projects`;
      const method = projectToEdit ? "PUT" : "POST";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
        }),
      });

      if (response === null) {
        throw new Error("Unauthorized");
      }

      if (response.ok) {
        toast.success(
          projectToEdit
            ? "Project updated successfully"
            : "Project added successfully",
          {
            position: "bottom-right",
            autoClose: 3000,
          }
        );

        if (projectToEdit && onEditComplete) {
          onEditComplete();
        } else {
          onAdd();
        }
      } else {
        const errorMessage = await response.text();
        toast.error(errorMessage, {
          position: "bottom-right",
          autoClose: 3000,
        });
        throw new Error(
          `Failed to ${projectToEdit ? "update" : "add"} project: ${
            response.status
          } - ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setError(`Failed to ${projectToEdit ? "update" : "add"} project`);
    }
  };

  return { handleAddProject, error };
};

export default useAddProject;
