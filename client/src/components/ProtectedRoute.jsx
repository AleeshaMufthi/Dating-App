import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AppContext);
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
