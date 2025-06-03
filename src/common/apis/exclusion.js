import { api } from "./api";

export const addExclusionRule = (exclusion, exchangeId) => {
  return api.post(`/exclusion-rules/exchange/${exchangeId}`, exclusion);
};
