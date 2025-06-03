import { api } from "./api";
export const addParticipantsToExchange = (userIds, exchangeId) => {
  return api.post(`/participants/`, {
    userIds,
    giftExchangeId: exchangeId,
  });
};

export const fetchAllExchangeParticipants = (exchangeId) => {
  return api.get(`/participants/exchange/${exchangeId}`);
};
