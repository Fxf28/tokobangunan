// src/pages/admin/Inventory.tsx
import { useState, useEffect } from "react"; // --- BARU ---
import api from "../../api"; // --- BARU ---
import { Plus, Search, ChevronDown, Edit, Trash2 } from "lucide-react";
import AddProductModal from "../../components/admin/AddProductModal";
import EditProductModal from "../../components/admin/EditProductModal";

const formatRupiah = (number: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);

const Inventory = () => {
  // --- STATE BARU ---
  const [products, setProducts] = useState<any[]>([]); // State untuk simpan produk
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fungsi untuk mengambil data produk dari API
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      // Kita panggil API /api/products yang sudah ada
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Panggil API saat komponen pertama kali di-load
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenEditModal = (product: any) => {
    setSelectedProduct(product);
    setEditModalOpen(true);
  };

  // Fungsi untuk HAPUS produk
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Yakin ingin menghapus produk ini?")) {
      try {
        await api.delete(`/products/${id}`);
        // Jika sukses, refresh data
        fetchProducts();
      } catch (error) {
        console.error("Gagal menghapus produk:", error);
        alert("Gagal menghapus produk.");
      }
    }
  };
  // --- AKHIR STATE BARU ---

  return (
    <>
      <div className="space-y-6">
        {/* Bagian 1: Persediaan Produk (Stats) */}
        {/* ... (Biarkan statis dulu, atau bisa diisi dari 'products') ... */}
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Persediaan Produk
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Total Produk</p>
              <p className="text-2xl font-bold text-gray-900">
                100{" "}
                <span className="text-base font-normal text-gray-500">
                  Produk
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kategori Produk</p>
              <p className="text-2xl font-bold text-gray-900">
                15{" "}
                <span className="text-base font-normal text-gray-500">
                  Kategori
                </span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stok Tertinggi</p>
              <p className="text-2xl font-bold text-gray-900">
                1245{" "}
                <span className="text-base font-normal text-gray-500">
                  Stok
                </span>
              </p>
              <p className="text-xs text-gray-500">Bata Merah</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stok Terendah</p>
              <p className="text-2xl font-bold text-red-600">
                40{" "}
                <span className="text-base font-normal text-gray-500">
                  Stok
                </span>
              </p>
              <p className="text-xs text-gray-500">Semen Putih</p>
            </div>
          </div>
        </div>

        {/* Bagian 2: Tabel Produk */}
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          {/* Header Tabel (Search, Filter, Add) */}
          <div className="flex flex-col items-start justify-between gap-4 p-5 md:flex-row md:items-center">
            <h3 className="text-lg font-semibold text-gray-900">Products</h3>
            <div className="flex w-full items-center gap-2 md:w-auto">
              {/* Search */}
              <div className="relative flex-1 md:flex-none">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search size={16} className="text-gray-400" />
                </span>
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-sm focus:outline-none"
                />
              </div>
              {/* Category Filter */}
              <button className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
                <span>Category</span>
                <ChevronDown size={16} />
              </button>
              {/* Add Product Button */}
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                <Plus size={16} />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Kode Produk
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Nama Produk
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Harga
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Satuan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                  >
                    Stok
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
                    <td colSpan={7} className="p-4 text-center">
                      Loading data...
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {product.kode || `PROD-${product.id}`}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image_url || "/Home/bata.jpg"}
                            alt={product.nama}
                            className="h-8 w-8 rounded-md object-cover"
                          />
                          <span className="font-medium text-gray-900">
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {product.category_id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatRupiah(product.price)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {product.satuan || "Buah"}
                        {/* (Asumsi 'satuan' ada) */}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {product.stock}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenEditModal(product)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-gray-200 p-4">
            <div className="text-sm text-gray-700">
              Row Per Page:{" "}
              <select className="border-gray-300 rounded-md">
                <option>10</option>
              </select>{" "}
              Entries
            </div>
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100">
                &lt;
              </button>
              <button className="px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-200">
                1
              </button>
              <button className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100">
                3
              </button>
              <span className="text-sm text-gray-500">...</span>
              <button className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100">
                10
              </button>
              <button className="px-3 py-1 rounded-md text-sm text-gray-500 hover:bg-gray-100">
                &gt;
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Modal Tambah Produk */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        // Kirim fungsi 'fetchProducts' agar modal bisa refresh data
        onSuccess={fetchProducts}
      />

      {/* Modal Edit Produk */}
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        product={selectedProduct}
        // Kirim fungsi 'fetchProducts' agar modal bisa refresh data
        onSuccess={fetchProducts}
      />
    </>
  );
};

export default Inventory;
