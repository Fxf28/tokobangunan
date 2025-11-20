// src/components/admin/EditProductModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react"; // --- BARU ---
import { UploadCloud } from "lucide-react";
import api from "../../api"; // --- BARU ---

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: any; // Tipe data produk kamu
  onSuccess: () => void; // --- BARU: Fungsi untuk refresh data
};

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  onSuccess,
}: ModalProps) => {
  // --- STATE BARU ---
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({ ...product });

  // Update form data saat 'product' prop berubah
  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  // Ambil data kategori saat modal dibuka
  useEffect(() => {
    if (isOpen) {
      const fetchCategories = async () => {
        try {
          const response = await api.get("/categories");
          setCategories(response.data);
        } catch (error) {
          console.error("Gagal ambil kategori:", error);
        }
      };
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Kirim data update ke backend
      await api.put(`/products/${product.id}`, formData);
      onSuccess(); // Panggil fungsi refresh
      onClose(); // Tutup modal
    } catch (error) {
      console.error("Gagal update produk:", error);
      alert("Gagal update produk.");
    }
  };
  // --- AKHIR STATE BARU ---

  if (!product) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* ... (Backdrop, sama seperti AddProductModal) ... */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Edit Product
                </Dialog.Title>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  {" "}
                  {/* Image Upload (Sudah ada gambar) */}
                  <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col items-center">
                      <img
                        src={product.img}
                        alt={product.nama}
                        className="h-28 w-28 rounded-md object-cover"
                      />
                      <button
                        type="button"
                        className="mt-2 text-xs font-semibold text-blue-600"
                      >
                        Change Image
                      </button>
                    </div>
                  </div>
                  {/* Form Fields (Sudah terisi) */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Kode Produk
                      </label>
                      <input
                        type="text"
                        name="kode"
                        value={formData.kode || ""}
                        onChange={handleChange}
                        readOnly
                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ""}
                        onChange={handleChange}
                        defaultValue={product.nama}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <select
                      name="category_id"
                      value={formData.category_id || ""}
                      onChange={handleChange}
                      defaultValue={product.kategori}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    >
                      <option>Pilih kategori produk</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Harga
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price || ""}
                        onChange={handleChange}
                        defaultValue={product.harga}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Satuan
                      </label>
                      <input
                        type="text"
                        name="satuan"
                        value={formData.satuan || ""}
                        onChange={handleChange}
                        defaultValue={product.satuan}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Stok
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock || ""}
                        onChange={handleChange}
                        defaultValue={product.stok}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      onClick={onClose}
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditProductModal;
