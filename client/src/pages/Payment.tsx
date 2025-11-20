// src/pages/Payment.tsx
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import InvoiceModal from "../components/InvoiceModal"; // --- BARU ---

// Fungsi format Rupiah
const formatRupiah = (number: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

// Warna gold
const goldColor = "#b99556"; // Ambil dari logo/desain

const Payment = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // --- BARU: State untuk mengontrol modal Invoice ---
  const [showInvoice, setShowInvoice] = useState(false);

  // Nanti data ini didapat dari respon API
  const [invoiceData, setInvoiceData] = useState({
    id: "INV250920250001",
    nama: "Carl Evans",
    total: 50000000,
    metode: "Bayar Di Tempat",
    tanggal: "25 September 2025",
  });

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // 1. Kumpulkan data form
    // 2. Kirim data ke backend API (POST /api/orders)
    // 3. Jika sukses:
    //    - Ambil data respon (invoiceData)
    //    - setInvoiceData(responData);
    //    - setShowInvoice(true);

    // --- Simulasi sukses ---
    setShowInvoice(true);
  };

  return (
    <>
      <div className="bg-white">
        {/* 1. Hero Section (Sesuai desain Billing.jpg) */}
        <section
          className="relative h-[250px] bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: "url('/path/to/payment-hero.jpg')", // Ganti gambar hero
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold text-white">Payment</h1>
            <nav className="text-sm text-gray-200 mt-2 font-medium">
              <Link to="/" className="hover:underline">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
              <span className="mx-2">&gt;</span>
              <span>Checkout &gt; Payment</span>
            </nav>
          </div>
        </section>

        {/* 2. Main Content Section (Form & Summary) */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6">
            <form
              onSubmit={handleOrder}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12"
            >
              {/* Kolom Kiri: Detail Tagihan (Form) */}
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Detail Tagihan
                </h2>
                <div className="space-y-5">
                  <div>
                    <label
                      htmlFor="nama"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Pembeli *
                    </label>
                    <input
                      type="text"
                      id="nama"
                      required
                      placeholder="Tulis nama lengkap Anda"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="perusahaan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nama Perusahaan (Opsional)
                    </label>
                    <input
                      type="text"
                      id="perusahaan"
                      placeholder="Tidak wajib diisi"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="kota"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Kota *
                    </label>
                    <select
                      id="kota"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    >
                      <option>Pilih kota (hanya menjangkau Jabodetabek)</option>
                      <option>Jakarta</option>
                      <option>Bogor</option>
                      <option>Depok</option>
                      <option>Tangerang</option>
                      <option>Bekasi</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="alamat"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Alamat Lengkap *
                    </label>
                    <textarea
                      id="alamat"
                      rows={3}
                      required
                      placeholder="Tulis alamat lengkap untuk pengiriman"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    ></textarea>
                  </div>
                  <div>
                    <label
                      htmlFor="telepon"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nomor Telepon *
                    </label>
                    <input
                      type="tel"
                      id="telepon"
                      required
                      placeholder="Tulis nomor telepon yang bisa dihubungi"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="Tulis alamat email untuk detail pesanan"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="catatan"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Informasi / Catatan Tambahan (Opsional)
                    </label>
                    <textarea
                      id="catatan"
                      rows={2}
                      placeholder="Tulis catatan tambahan (patokan, jam kirim, dll.)"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-0 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Ringkasan Pesanan */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 h-fit">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b pb-4">
                  Products
                </h2>

                {/* Daftar Produk */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <p className="text-sm text-gray-600">
                        {item.name}{" "}
                        <span className="font-medium text-gray-800">
                          x {item.quantity}
                        </span>
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatRupiah(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <p className="text-base font-medium text-gray-700">
                    Subtotal
                  </p>
                  <p className="text-base font-medium text-gray-900">
                    {formatRupiah(total)}
                  </p>
                </div>
                {/* Total */}
                <div className="flex justify-between items-center border-t pt-4 mt-4">
                  <p className="text-xl font-bold text-gray-900">Total</p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: goldColor }}
                  >
                    {formatRupiah(total)}
                  </p>
                </div>

                {/* Opsi Pembayaran */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-start p-4 border border-gray-300 rounded-md">
                    <input
                      id="transfer"
                      name="paymentMethod"
                      type="radio"
                      className="h-4 w-4 mt-1 border-gray-300"
                      style={{ color: goldColor }}
                    />
                    <label htmlFor="transfer" className="ml-3 block text-sm">
                      <span className="font-medium text-gray-900">
                        Transfer Bank
                      </span>
                      {/* <p className="text-gray-500">Teks deskripsi untuk transfer bank...</p> */}
                    </label>
                  </div>
                  <div className="flex items-start p-4 border border-gray-300 rounded-md">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      defaultChecked
                      className="h-4 w-4 mt-1 border-gray-300"
                      style={{ color: goldColor }}
                    />
                    <label htmlFor="cod" className="ml-3 block text-sm">
                      <span className="font-medium text-gray-900">
                        Bayar Di Tempat
                      </span>
                      <p className="text-gray-500 mt-1">
                        Pilih metode Bayar Di Tempat untuk membayar pesanan Anda
                        saat barang diterima...
                      </p>
                    </label>
                  </div>
                </div>

                <p className="mt-6 text-xs text-gray-500">
                  Data Anda akan digunakan untuk memproses pesanan Anda dan
                  mendukung pengalaman Anda di seluruh situs web ini, dan untuk
                  tujuan lain yang dijelaskan dalam{" "}
                  <Link
                    to="/privacy"
                    className="font-medium"
                    style={{ color: goldColor }}
                  >
                    kebijakan privasi kami
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  className="mt-6 w-full flex items-center justify-center rounded-md border border-gray-400 bg-white px-6 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50"
                >
                  Order
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>

      {/* --- MODAL INVOICE (Muncul jika showInvoice true) --- */}
      <InvoiceModal
        isOpen={showInvoice}
        onClose={() => setShowInvoice(false)}
        data={invoiceData}
      />
    </>
  );
};

export default Payment;
