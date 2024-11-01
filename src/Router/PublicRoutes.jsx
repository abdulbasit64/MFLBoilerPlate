import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = ({ isAuthenticated, userRole, redirectTo }) => {
  return !isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PublicRoutes;
