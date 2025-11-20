// src/components/admin/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // --- BARU ---

const ProtectedRoute = () => {
  // Ambil status dari "otak" login
  const { isAuthenticated, isLoading } = useAuth(); // --- BARU ---

  // 1. Jika masih loading, tunggu...
  if (isLoading) {
    return <div>Loading...</div>; // Nanti bisa ganti jadi spinner keren
  }

  // 2. Jika sudah tidak loading, cek status
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
