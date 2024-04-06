import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthState } from "../../redux/authSlice";

export default function useAuthValidation({ token }: AuthState) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
}
