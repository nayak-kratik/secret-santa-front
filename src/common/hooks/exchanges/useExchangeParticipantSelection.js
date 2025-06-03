import { useState, useCallback } from "react";
export default function useParticipantSelection() {
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  // Use useCallback Memoize the function and prevents unnecessary re-renders of child components that receive these functions as props
  // When these functions are used in useEffect dependencies in child components, this useCallback prevents infinite loops
  const toggleUser = useCallback((userId) => {
    // This function is used to toggle the selection of a user
    setSelectedUsers((prev) => {
      const newSelection = new Set(prev);
      if (newSelection.has(userId)) {
        newSelection.delete(userId);
      } else {
        newSelection.add(userId);
      }
      return newSelection;
    });
  }, []);

  // This useCallback Depends on fetchUsers, so it will update if fetchUsers changes
  const selectAll = useCallback((userIds) => {
    setSelectedUsers(new Set(userIds));
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedUsers(new Set());
  }, []);

  return {
    selectedUsers,
    toggleUser,
    selectAll,
    clearSelection,
  };
}
