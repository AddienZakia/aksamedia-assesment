import { useNavigate } from "react-router-dom";
import { getToken, removeToken, setToken } from "../utils/cookies";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useStore";

const {
  VITE_EMAIL: EMAIL,
  VITE_TOKEN: USER_TOKEN,
  VITE_NAME: NAME,
} = import.meta.env;

const LOGIN_PATH = "/login";

export default function AuthCheck({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const token = getToken();

  useEffect(() => {
    if (token === USER_TOKEN) {
      setToken(USER_TOKEN);
      setIsAuth(true);
      setUser({
        name: NAME,
        email: EMAIL,
      });
    } else {
      if (token) removeToken();
      navigate(LOGIN_PATH);
      return;
    }
  }, []);

  return <>{isAuth && children}</>;
}
