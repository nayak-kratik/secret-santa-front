import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../apis/auth";
import { setCookie } from "../../utils/cookie";

export default function useLogin() {
  const [loginState, setLoginState] = useState({
    email: "",
    isSubmitting: false,
  });

  const navigate = useNavigate();
  const isDisabled = !loginState.email || loginState.isSubmitting;

  const setEmail = (email) => {
    setLoginState((prev) => ({ ...prev, email }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const response = await login(loginState.email);
      if (response?.data?.isAdmin) {
        setCookie("adminId", response.data.id, 2); // 2 days
        navigate("/");
      } else {
        toast.error("You are not authorized as admin.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoginState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return {
    email: loginState.email,
    setEmail,
    handleSubmit,
    isSubmitting: loginState.isSubmitting,
    isDisabled,
  };
}
