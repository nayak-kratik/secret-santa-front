import { api } from "./api";

export const getMatches = async (exchangeId) => {
  return await api.get(`/matches/exchange/${exchangeId}`);
};
