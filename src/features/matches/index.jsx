import React from "react";
import { useRequireAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";

export default function ManageMatches() {
  // Use on the dashboard page: if not admin, redirect to login (/)
  useRequireAdmin();

  return (
    <div>
      <h1>Manage Matches</h1>
    </div>
  );
}
