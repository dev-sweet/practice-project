import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/shared/Loading";
const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (user?.email) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
