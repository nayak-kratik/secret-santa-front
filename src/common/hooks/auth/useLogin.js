import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../apis/auth";
import { setCookie } from "../../utils/cookie";

export default function useLogin() {
  const [state, setState] = useState({
    email: "",
    isSubmitting: false,
  });

  const navigate = useNavigate();
  const isDisabled = !state.email || state.isSubmitting;

  const setEmail = (email) => {
    setState((prev) => ({ ...prev, email }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const response = await login(state.email);
      if (response?.data?.isAdmin) {
        setCookie("adminEmail", state.email, 2); // 2 days
        navigate("/");
      } else {
        toast.error("You are not authorized as admin.");
      }
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  return {
    email: state.email,
    setEmail,
    handleSubmit,
    isSubmitting: state.isSubmitting,
    isDisabled,
  };
}
