import { api } from "./api";
export const addParticipantsToExchange = (userIds, exchangeId) => {
  return api.post(`/participants/`, {
    userIds,
    giftExchangeId: exchangeId,
  });
};
