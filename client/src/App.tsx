// client/src/App.tsx
import { Routes, Route } from "react-router-dom";

// Layout & Halaman Publik
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Checkout from "./pages/Checkout"; // --- BARU ---
import Payment from "./pages/Payment"; // --- BARU ---

// Layout & Halaman Admin
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/dashboard";
import Inventory from "./pages/admin/Inventory";
import Orders from "./pages/admin/Orders";
import OrderDetail from "./pages/admin/OrderDetail";

function App() {
  return (
    <Routes>
      {/* === RUTE PUBLIK (DENGAN NAVBAR/FOOTER) === */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<Contact />} />

        {/* --- RUTE BARU UNTUK FLOW E-COMMERCE --- */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        {/* -------------------------------------- */}
      </Route>

      {/* === RUTE ADMIN (RAHASIA) === */}
      {/* ... (sisa kode rute admin kamu tetap sama) ... */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:id" element={<OrderDetail />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
