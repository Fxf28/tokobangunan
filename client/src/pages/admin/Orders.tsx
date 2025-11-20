// src/pages/admin/Orders.tsx
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { useState, useEffect } from "react"; // --- BARU ---
import api from "../../api"; // --- BARU ---

const Orders = () => {
  // --- STATE BARU ---
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Gagal mengambil data pesanan:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
  // --- AKHIR STATE BARU ---

  return (
    <div className="space-y-6">
      {/* Bagian 1: Total Transaksi (Stats) */}
      <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Total Transaksi
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="text-sm text-gray-500">Total Pembeli</p>
            <p className="text-2xl font-bold text-gray-900">
              201{" "}
              <span className="text-base font-normal text-gray-500">
                Pembeli
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Pesanan</p>
            <p className="text-2xl font-bold text-gray-900">
              2467{" "}
              <span className="text-base font-normal text-gray-500">
                Pesanan
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pesanan Selesai</p>
            <p className="text-2xl font-bold text-green-600">
              2465{" "}
              <span className="text-base font-normal text-gray-500">
                Pesanan
              </span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Dalam Pengiriman</p>
            <p className="text-2xl font-bold text-yellow-600">
              2{" "}
              <span className="text-base font-normal text-gray-500">
                Pesanan
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Bagian 2: Tabel Pesanan Masuk */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">Pesanan Masuk</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  ID Pesanan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Nama Pembeli
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Tanggal Pemesanan
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Nomor Telepon
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Kota
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {/* --- DATA BARU --- */}
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center">
                    Loading data...
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.idPesanan}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-600">
                      INV{order.id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      {order.customer_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(order.order_date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.customer_phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {order.customer_city}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm">
                      <Link
                        to={`/admin/orders/${order.id}`} // Arahkan ke Detail Order
                        className="text-gray-500 hover:text-blue-600"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 p-4">
          <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </button>
          <span className="text-sm text-gray-500">Page 1 of 10</span>
          <button className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
