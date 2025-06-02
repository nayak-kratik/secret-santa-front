import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getExchanges,
  createExchange,
  deleteExchange,
} from "../../apis/exchange";
import { getCookie } from "../../utils/cookie";

export default function useExchanges() {
  const [state, setState] = useState({
    exchanges: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const exchanges = await getExchanges();
      setState({ exchanges: exchanges.data, loading: false, error: null });
    } catch (error) {
      setState({
        exchanges: [],
        loading: false,
        error: error.message || "Failed to fetch exchanges",
      });
    }
  }, []);

  const addExchange = useCallback(
    async (exchange) => {
      const createdById = getCookie("adminId");
      if (!createdById) {
        toast.error("Admin session expired. Please login again.");
        return;
      }
      try {
        await createExchange({ ...exchange, createdById });
        await fetchExchanges();
        toast.success("Exchange created successfully");
      } catch (error) {
        toast.error(error.message || "Failed to add exchange");
      }
    },
    [fetchExchanges]
  );

  const removeExchange = useCallback(
    async (exchangeId) => {
      try {
        await deleteExchange(exchangeId);
        await fetchExchanges();
        toast.warning("Exchange deleted successfully");
      } catch (error) {
        toast.error(error.message || "Failed to delete exchange");
      }
    },
    [fetchExchanges]
  );
  return { ...state, addExchange, removeExchange };
}
