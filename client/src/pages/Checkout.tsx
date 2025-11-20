// src/pages/Checkout.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";

// Fungsi format Rupiah
const formatRupiah = (number: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const Checkout = () => {
  // Ambil data (dummy) dari context
  const { cartItems } = useCart();

  // Hitung total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal; // Nanti bisa ditambah ongkir, dll.

  return (
    <div className="bg-white">
      {/* 1. Hero Section (Sesuai desain Checkout.jpg) */}
      <section
        className="relative h-[250px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/Home/furniture.jpg')", // Ganti gambar hero
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white">Checkout</h1>
          <nav className="text-sm text-gray-200 mt-2 font-medium">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link to="/products" className="hover:underline">
              Products
            </Link>
            <span className="mx-2">&gt;</span>
            <span>Checkout</span>
          </nav>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6">
          {/* Grid: Tabel + Total */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Kolom Kiri: Tabel Produk (lg:col-span-2) */}
            <div className="lg:col-span-2">
              <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                      >
                        Produk
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                      >
                        Harga
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                      >
                        Jumlah
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                      >
                        Total Tagihan
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                      ></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-16 w-16 rounded-md object-cover"
                            />
                            <span className="font-medium text-gray-900">
                              {item.name}
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                          {formatRupiah(item.price)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <div className="flex items-center border border-gray-300 rounded-md w-fit">
                            <button className="p-2.5 text-gray-600 hover:bg-gray-100">
                              <Minus size={14} />
                            </button>
                            <span className="px-4 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button className="p-2.5 text-gray-600 hover:bg-gray-100">
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                          {formatRupiah(item.price * item.quantity)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <button className="text-gray-400 hover:text-red-500">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Kolom Kanan: Total Pesanan */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-300 pb-4">
                  Total Pesanan
                </h3>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {formatRupiah(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-gray-900 border-t border-gray-300 pt-4 mt-4">
                    <span>Total</span>
                    <span className="text-[#9e6621]">
                      {formatRupiah(total)}
                    </span>
                  </div>
                </div>
                <Link
                  to="/payment" // Arahkan ke halaman Billing / Payment
                  className="mt-6 w-full flex items-center justify-center rounded-md border border-transparent bg-[#9e6621] px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90"
                >
                  Payment
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
