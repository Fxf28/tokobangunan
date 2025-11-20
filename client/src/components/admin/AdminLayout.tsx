// src/components/admin/AdminLayout.tsx
import { useState } from "react"; // --- BARU ---
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const AdminLayout = () => {
  // --- BARU: State untuk mengontrol sidebar di mobile ---
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* --- PERUBAHAN: Berikan state ke Sidebar --- */}
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content Area (Scrollable) */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* --- PERUBAHAN: Berikan state ke Topbar --- */}
        <Topbar setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {" "}
          {/* --- PERUBAHAN: Padding mobile lebih kecil --- */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
