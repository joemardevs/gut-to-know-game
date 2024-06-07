import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = () => {
  const { isAuthenticated } = useAuth();

  console.log("isAuthenticated", isAuthenticated);

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
