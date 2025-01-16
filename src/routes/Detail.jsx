import { useEffect, useState } from "react";
import { ChevronLeft } from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";
import { twMerge } from "tailwind-merge";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthCheck from "../components/AuthCheck";
import { GetDatabase, UpdateDatabase } from "../utils/database";
import ModalConfirm from "../components/Modal/ModalConfirm";

function Detail() {
  const db = GetDatabase();
  const { id } = useParams();
  const navigate = useNavigate();

  const [modalConfirm, setModalConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState("");

  const [dataUser, setDataUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const onValueChange = (e) => {
    const { name, value } = e.target;

    setDataUser((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    UpdateDatabase(db, id, dataUser);
    setModalConfirm(false);
    setIsEdit(false);
  };

  useEffect(() => {
    // redirect to /admin if user doesn't exist
    const findData = db.filter((x) => x.id === id);
    if (!findData.length) return navigate("/admin");

    setDataUser(findData[0]);
  }, []);

  return (
    <DashboardLayout>
      <Link to="/admin">
        <button
          className={twMerge(
            "flex items-center justify-center gap-1 px-4 py-2 rounded-full",
            "text-white bg-darkBlue-main hover:bg-darkBlue-hover transition-all duration-200"
          )}
        >
          <ChevronLeft size={18} />
          <span>Kembali</span>
        </button>
      </Link>

      <section className="flex items-center justify-center">
        <div className="relative z-20 w-[90%] md:w-[70%] lg:w-[60%] 2xl:w-[40%] bg-white rounded-2xl p-6 md:py-8 space-y-4 dark:bg-darkMode-surface">
          <h1 className="text-3xl font-bold text-center">Detail Produk</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="space-y-1 md:col-span-2">
                <p className="font-medium">
                  Nama Produk<span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  id="product"
                  name="product"
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.product}
                  onChange={onValueChange}
                  disabled={!isEdit}
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
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.description}
                  onChange={onValueChange}
                  disabled={!isEdit}
                  required
                />
              </div>

              <div className="w-full space-y-1">
                <p className="font-medium">
                  Kategori<span className="text-red-500">*</span>
                </p>
                <div className="relative flex items-center w-full pr-3 text-base font-medium text-gray-400 truncate shadow-sm bg-slate-100 rounded-xl dark:bg-darkMode-hover">
                  <select
                    name="category"
                    id="category"
                    className={twMerge(
                      "w-full p-3 px-4 text-black cursor-pointer dark:text-darkMode-typo bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                      isEdit && "dark:text-white"
                    )}
                    onChange={onValueChange}
                    value={dataUser.category}
                    disabled={!isEdit}
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
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.stock}
                  onChange={onValueChange}
                  disabled={!isEdit}
                  required
                />
              </div>

              <div className="space-y-1">
                <p className="font-medium">Diskon</p>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.discount}
                  onChange={onValueChange}
                  disabled={!isEdit}
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
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.price}
                  onChange={onValueChange}
                  disabled={!isEdit}
                  required
                />
              </div>

              <div className="space-y-1">
                <p className="font-medium">Supplier</p>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.supplier || "-"}
                  onChange={onValueChange}
                  disabled={!isEdit}
                  required={false}
                />
              </div>

              <div className="space-y-1">
                <p className="font-medium">Pabrik</p>
                <input
                  type="text"
                  id="manufacturer"
                  name="manufacturer"
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={dataUser.manufacturer || "-"}
                  onChange={onValueChange}
                  disabled={!isEdit}
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
                  className={twMerge(
                    "w-full p-3 text-base truncate rounded-md bg-slate-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:font-medium dark:bg-darkMode-hover",
                    isEdit && "dark:text-white"
                  )}
                  defaultValue={(dataUser.tags ?? []).join(", ")}
                  onChange={onValueChange}
                  disabled={!isEdit}
                  required
                />
                <p className="text-xs font-medium">
                  *note: pisahkan dengan koma (,)
                </p>
              </div>
            </div>
          </form>

          <div className="grid grid-cols-2 gap-3 pt-5">
            <button
              type="button"
              className={twMerge(
                "w-full p-2 text-center transition-all duration-200 bg-red-500 rounded-md text-lightBlue hover:bg-red-700",
                isEdit &&
                  "bg-orange-500 rounded-md text-lightBlue hover:bg-orange-700 flex-1 w-full"
              )}
              onClick={() => {
                if (isEdit) setIsEdit(false);
                else {
                  setModalConfirm(true);
                  setConfirmType("delete");
                }
              }}
            >
              {isEdit ? "Cancel" : "Delete Data"}
            </button>
            <button
              type="button"
              className="w-full p-2 text-center transition-all duration-200 rounded-md bg-darkBlue-main text-lightBlue hover:bg-darkBlue-hover"
              onClick={() => {
                if (isEdit) {
                  setModalConfirm(true);
                  setConfirmType("edit");
                } else {
                  setIsEdit(true);
                }
              }}
            >
              {isEdit ? "Simpan Data" : "Edit Data"}
            </button>
          </div>
        </div>
      </section>

      {/* Modal Confirmation */}
      <ModalConfirm
        id={id}
        setConfirm={setModalConfirm}
        confirm={modalConfirm}
        namaProduk={dataUser.product}
        confirmType={confirmType}
        handleSubmit={handleSubmit}
      />
    </DashboardLayout>
  );
}

export default function DetailMiddleware() {
  return (
    <AuthCheck>
      <Detail />
    </AuthCheck>
  );
}
