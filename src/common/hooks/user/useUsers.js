import { useState, useEffect } from "react";
import { getUsers, createUser } from "../../apis/user";
import { toast } from "react-toastify";

export default function useUsers() {
  const [state, setState] = useState({
    users: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const users = await getUsers();
      setState({ users: users.data, loading: false, error: null });
    } catch (error) {
      setState({
        users: [],
        loading: false,
        error: error.message || "Failed to fetch users",
      });
    }
  };

  const addUser = async (user) => {
    try {
      await createUser(user);
      await fetchUsers();
    } catch (error) {
      toast.error(error.message || "Failed to add user");
    }
  };

  return { ...state, addUser };
}
