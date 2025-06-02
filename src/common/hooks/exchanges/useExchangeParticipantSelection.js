import { useState, useCallback } from "react";
export default function useParticipantSelection(initialUsers = []) {
  const [selectedUsers, setSelectedUsers] = useState(new Set());

  // toggle user selection
  // Use useCallback to prevent re-renders on every render.
  const toggleUser = useCallback((userId) => {
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

  // select all users
  const selectAll = useCallback((userIds) => {
    setSelectedUsers(new Set(userIds));
  }, []);

  // clear selection
  const clearSelection = useCallback(() => {
    setSelectedUsers(new Set());
  }, []);

  return {
    selectedUsers,
    toggleUser,
    selectAll,
    clearSelection,
    isSelected: (userId) => selectedUsers.has(userId),
  };
}
