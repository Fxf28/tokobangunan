// src/components/admin/AddProductModal.tsx
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react"; // --- BARU ---
import { UploadCloud } from "lucide-react";
import api from "../../api"; // --- BARU ---

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void; // --- BARU: Fungsi untuk refresh data
};

const AddProductModal = ({ isOpen, onClose, onSuccess }: ModalProps) => {
  // --- STATE BARU ---
  const [categories, setCategories] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    kode: "",
    category_id: "",
    price: "",
    satuan: "",
    stock: "",
  });

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
      // Kirim data baru ke backend
      await api.post("/products", formData);
      onSuccess(); // Panggil fungsi refresh dari Inventory.tsx
      onClose(); // Tutup modal
    } catch (error) {
      console.error("Gagal menambah produk:", error);
      alert("Gagal menambah produk.");
    }
  };
  // --- AKHIR STATE BARU ---

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
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
                  New Product
                </Dialog.Title>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                  {" "}
                  {/* Image Upload */}
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud size={32} className="text-gray-400" />
                        <p className="mt-2 text-xs text-center text-gray-500">
                          Drag image here <br /> or{" "}
                          <span className="font-semibold text-blue-600">
                            Browse Image
                          </span>
                        </p>
                      </div>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Kode Produk
                      </label>
                      <input
                        type="text"
                        name="kode"
                        value={formData.kode}
                        onChange={handleChange}
                        placeholder="Masukkan kode produk"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                      />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Nama Produk
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama produk"
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
                      value={formData.category_id}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                    >
                      <option>Pilih kategori produk</option>
                      {/* --- DATA BARU --- */}
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
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Masukkan harga"
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
                        value={formData.satuan}
                        onChange={handleChange}
                        placeholder="Masukkan satuan"
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
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Masukkan jumlah"
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
                      Add Product
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

export default AddProductModal;
