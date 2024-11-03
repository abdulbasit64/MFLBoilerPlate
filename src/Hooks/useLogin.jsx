import { useMutation } from "react-query";
import useUserStore from "./userStore";
import axios from "axios";

const loginUser = async (credentials) => {
  const response = await axios.post("/api/login", credentials);
  return response.data; // Assume this returns the user object
};

export function useLogin() {
  const setUser = useUserStore((state) => state.setUser);

  return useMutation(loginUser, {
    onSuccess: (data) => {
      // Set the user in the store upon successful login
      setUser(data);
    },
    onError: (error) => {
      // Handle errors here (e.g., display a notification)
      console.error("Login failed", error);
    },
  });
}
