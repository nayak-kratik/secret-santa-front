import { Outlet } from "react-router-dom";
import { useRequireAdmin } from "../../common/hooks/auth/useRedirectIfAdmin";

const ProtectedRoute = () => {
  // This will handle the redirection if user is not admin
  useRequireAdmin();

  // If we get here, user is admin
  return <Outlet />;
};

export default ProtectedRoute;
