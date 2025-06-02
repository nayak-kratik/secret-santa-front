import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";

// Use on the login (/) page: if already admin, redirect to dashboard
export const useRedirectIfAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const adminId = getCookie("adminId");
    if (adminId) {
      navigate("/");
    }
  }, [navigate]);
};

// Use on the dashboard page: if not admin, redirect to login (/)
export const useRequireAdmin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const adminId = getCookie("adminId");
    if (!adminId) {
      navigate("/login");
    }
  }, [navigate]);
};
