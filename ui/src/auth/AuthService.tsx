import { BASE_URL } from "../utils/constants";
import { ErrorResponse, ZodErrorDetail } from "./types";

const parseErrorMessage = (errors?: ZodErrorDetail[]): string => {
  if (!errors) return "Invalid Credentials";
  return errors.map((err) => err.message).join(", ");
};

export const signup = async (
  email: string,
  password: string,
  username: string
) => {
  const response = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, username }),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    const errorMessage = parseErrorMessage(errorData.errors);
    throw new Error(errorMessage || "Signup failed");
  }

  const data = await response.json();
  return data.token;
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    const errorMessage = parseErrorMessage(errorData.errors);
    throw new Error(errorMessage || "Login failed");
  }

  const data = await response.json();
  return data.token;
};
