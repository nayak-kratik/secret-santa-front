import { api } from "./api";

export const getUsers = () => {
  return api.get("/users");
};

export const createUser = (user) => {
  return api.post("/users", user);
};

export const deleteUser = (userId) => {
  return api.delete(`/users/${userId}`);
};
