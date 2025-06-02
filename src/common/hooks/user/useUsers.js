import { useState, useEffect, useCallback } from "react";
import { getUsers, createUser, deleteUser } from "../../apis/user";
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

  // UseCallback prevents unnecessary re-renders in components that depend on this function
  // Empty dependency array means this function is created once when the hook is first used
  const fetchUsers = useCallback(async () => {
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
  }, []);

  // This useCallback Depends on fetchUsers, so it will update if fetchUsers changes
  const addUser = useCallback(
    async (user) => {
      try {
        await createUser(user);
        await fetchUsers();
        toast.success("User created successfully");
      } catch (error) {
        toast.error(error.message || "Failed to add user");
      }
    },
    [fetchUsers]
  );

  const removeUser = useCallback(
    async (userId) => {
      try {
        await deleteUser(userId);
        await fetchUsers();
        toast.warning("User deleted successfully");
      } catch (error) {
        toast.error(error.message || "Failed to delete user");
      }
    },
    [fetchUsers]
  );
  return { ...state, addUser, removeUser };
}
