import { api } from "./api";

export const getExchanges = () => {
  return api.get("/gift-exchanges");
};

export const createExchange = (exchange) => {
  return api.post("/gift-exchanges", exchange);
};

export const deleteExchange = (exchangeId) => {
  return api.delete(`/gift-exchanges/${exchangeId}`);
};
