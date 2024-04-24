import { getStorage } from "../utils/storage";
import { ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const token = getStorage("accessToken");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && pathname === "/") {
      navigate(ROUTES.Login);
    }

    if (token && pathname === "/login") {
      navigate(ROUTES.Home);
    }
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
