import { api } from "./api";

export const getMatches = async (exchangeId) => {
  return await api.get(`/matches/exchange/${exchangeId}`);
};

export const getAllAdminMatches = async (userId) => {
  return await api.get(`/gift-exchanges/grouped-by-exchange/`);
};
