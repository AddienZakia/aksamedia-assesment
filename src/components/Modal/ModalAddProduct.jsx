import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddDatabase, GetDatabase } from "../../utils/database";
import Modal from "../Modal";

export default function ModalAddProduct({
  setModalAddProduct,
  modalAddProduct,
}) {
  const navigate = useNavigate();
  const [addProduct, setAddProduct] = useState({});

  const onValueChange = (e) => {
    const { name, value } = e.target;

    setAddProduct((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const AddProductSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...addProduct,
      id: crypto.randomUUID(),
      price: parseInt(addProduct.price),
      stock: parseInt(addProduct.stock),
      discount: parseInt(addProduct.discount ?? "0"),
      tags: addProduct.tags.split(/,\s?/),
      category: addProduct.category ?? "Groceries",
      supplier: addProduct.supplier ?? "",
      manufacturer: addProduct.manufacturer ?? "",

      // auto generate (random)
      addedDate: Date.now(),
      isAvailable: addProduct.stock > 0,
      rating: parseFloat((Math.random() * 4 + 1).toFixed(1)),
      sales: Math.floor(Math.random() * 300) + 50,
      reviews: Math.floor(Math.random() * 100) + 20,
    };

    const db = GetDatabase();
    AddDatabase(db, newData);

    navigate(0);
    setModalAddProduct(false);
  };

  return (
    <Modal setOpen={setModalAddProduct} open={modalAddProduct}>
      <h1 className="text-3xl font-bold text-center">Tambah Produk</h1>

      <form onSubmit={AddProductSubmit}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div className="space-y-1 md:col-span-2">
            <p className="font-medium">
              Nama Produk<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              id="product"
              name="product"
              placeholder="Masukkan nama produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <p className="font-medium">
              Deskripsi Produk<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Masukkan deskripsi produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required
            />
          </div>

          <div className="w-full space-y-1">
            <p className="font-medium">
              Kategori<span className="text-red-500">*</span>
            </p>
            <div className="relative flex items-center w-full pr-3 text-base font-medium text-gray-400 truncate shadow-sm bg-slate-100 rounded-xl">
              <select
                name="category"
                id="category"
                className="w-full p-3 px-4 cursor-pointer bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
                onChange={onValueChange}
                required
              >
                <option value="Groceries">Groceries</option>
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
              </select>
            </div>
          </div>

          <div className="w-full space-y-1">
            <p className="font-medium">
              Stok<span className="text-red-500">*</span>
            </p>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Masukkan jumlah stok produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required
            />
          </div>

          <div className="space-y-1">
            <p className="font-medium">Diskon</p>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="Masukkan diskon produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required={false}
            />
          </div>

          <div className="space-y-1">
            <p className="font-medium">
              Harga<span className="text-red-500">*</span>
            </p>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Masukkan harga produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required
            />
          </div>

          <div className="space-y-1">
            <p className="font-medium">Supplier</p>
            <input
              type="text"
              id="supplier"
              name="supplier"
              placeholder="Masukkan supplier produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required={false}
            />
          </div>

          <div className="space-y-1">
            <p className="font-medium">Pabrik</p>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              placeholder="Masukkan pabrik produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required={false}
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <p className="font-medium">
              Tags<span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              id="tags"
              name="tags"
              placeholder="Masukkan tags produk"
              className="w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium"
              onChange={onValueChange}
              required
            />
            <p className="text-xs font-medium">
              *note: pisahkan dengan koma (,)
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-2 mt-5 text-center transition-opacity duration-200 rounded-md bg-darkBlue-main text-lightBlue hover:bg-darkBlue-hover"
        >
          Tambah produk
        </button>
      </form>
    </Modal>
  );
}
