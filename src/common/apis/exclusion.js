import { api } from "./api";

export const addExclusionRule = (exclusion) => {
  return api.post("/exclusion-rules", exclusion);
};
