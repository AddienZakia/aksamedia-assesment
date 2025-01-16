import { twMerge } from "tailwind-merge";
import { GetDatabase, RemoveDatabase } from "../../utils/database";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal";

export default function ModalConfirm({
  id,
  setConfirm,
  confirm,
  namaProduk,
  confirmType,
  handleSubmit,
}) {
  const db = GetDatabase();
  const navigate = useNavigate();

  return (
    <Modal setOpen={setConfirm} open={confirm} className="2xl:w-[30%]">
      <h1 className="text-3xl font-bold text-center">Konfirmasi data</h1>

      {confirmType === "edit" ? (
        <p>
          Apakah kamu sudah yakin untuk melakukan perubahan data pada produk{" "}
          <b>{namaProduk}</b> ?
        </p>
      ) : (
        <p>
          Apakah kamu sudah yakin untuk menghapus data pada produk{" "}
          <b>{namaProduk}</b> ?
        </p>
      )}

      <button
        type="submit"
        className={twMerge(
          "w-full p-2 text-center transition-all duration-200 rounded-md cursor-pointer",
          confirmType === "edit"
            ? "bg-darkBlue-main text-lightBlue hover:bg-darkBlue-hover"
            : "bg-red-500 rounded-md text-lightBlue hover:bg-red-700"
        )}
        onClick={() => {
          if (confirmType === "edit") handleSubmit();
          else {
            RemoveDatabase(db, id);
            navigate("/admin");
          }
        }}
      >
        {confirmType === "edit" ? "Konfirmasi" : "Delete"}
      </button>
    </Modal>
  );
}
