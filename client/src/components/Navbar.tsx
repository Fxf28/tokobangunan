// src/components/Navbar.tsx
import { Link } from "react-router-dom";
import { User, Search, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext"; // --- BARU ---

const Navbar = () => {
  const { openCart, cartItems } = useCart(); // --- BARU (tambah cartItems) ---

  // Hitung total item unik di keranjang
  const totalItems = cartItems.length;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Mandiri Steel
        </Link>

        {/* Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <Link to="/products" className="text-gray-600 hover:text-gray-900">
            Products
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">
            Contact
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <Link to="/profile" className="text-gray-600 hover:text-gray-900">
            <User size={22} />
          </Link>
          <button className="text-gray-600 hover:text-gray-900">
            <Search size={22} />
          </button>

          {/* --- PERUBAHAN DI SINI --- */}
          {/* Ganti <Link> jadi <button> untuk buka sidebar */}
          <button
            onClick={openCart} // Panggil fungsi dari context
            className="text-gray-600 hover:text-gray-900 relative"
          >
            <ShoppingCart size={22} />
            {/* Tampilkan jumlah item jika ada */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          {/* --- AKHIR PERUBAHAN --- */}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
