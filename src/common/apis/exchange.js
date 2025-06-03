import { api } from "./api";

export const getExchanges = (adminId) => {
  return api.get(`/gift-exchanges/user/${adminId}`); // Get exchanges for a specific admin user
};

export const createExchange = (exchange) => {
  return api.post("/gift-exchanges", exchange);
};

export const deleteExchange = (exchangeId) => {
  return api.delete(`/gift-exchanges/${exchangeId}`);
};
