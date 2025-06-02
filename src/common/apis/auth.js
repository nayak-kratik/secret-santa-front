import { api } from "./api";

export const login = async (email) => {
  return api.post("/auth/login", { email });
};
