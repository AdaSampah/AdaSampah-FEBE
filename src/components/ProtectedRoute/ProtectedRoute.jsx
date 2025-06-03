import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  // Jika user tidak ada, arahkan ke halaman login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
