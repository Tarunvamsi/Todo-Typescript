import { useAuth } from "../auth/authContext";

export const useApi = () => {
  const { logout } = useAuth();

  const fetchFn = async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, init);
    if (response.status === 401) {
      logout();
    }

    return response;
  };

  return { fetch: fetchFn };
};
