import { twMerge } from "tailwind-merge";
import { Link } from "react-router-dom";

export default function Table({ DataProducts, currentPage }) {
  const sliceData = [(currentPage - 1) * 10, currentPage * 10];

  return (
    <div className="overflow-x-auto border-collapse xl:overflow-hidden rounded-xl">
      <table className="w-full border">
        {/* Table Head */}
        <tr className="text-white bg-darkBlue-main">
          <th className="font-semibold">No</th>
          <th className="font-semibold">Nama Produk</th>
          <th className="font-semibold">Kategori</th>
          <th className="font-semibold">Harga</th>
          <th className="font-semibold">Stok</th>
          <th className="font-semibold">Terjual</th>
          <th className="font-semibold">Details</th>
        </tr>

        {/* Table Body */}
        {DataProducts.length === 0 && (
          <tr className="text-center bg-white">
            <td colSpan={7}>Tidak ada data tersedia</td>
          </tr>
        )}
        {DataProducts.slice(sliceData[0], sliceData[1]).map((data, i) => {
          const categories = {
            Groceries: "bg-green-500",
            Furniture: "bg-orange-500",
            Electronics: "bg-blue-500",
            Clothing: "bg-pink-500",
            Books: "bg-purple-500",
          };

          return (
            <tr className="text-center text-black bg-white" key={data.id}>
              <td>{(currentPage - 1) * 10 + i + 1}</td>
              <td>{data.product}</td>
              <td>
                <span
                  className={twMerge(
                    "text-white py-1 px-4 rounded-full text-sm font-medium",
                    categories[data.category]
                  )}
                >
                  {data.category}
                </span>
              </td>
              <td>Rp {data.price.toLocaleString().replace(/,/g, ".")}</td>
              <td>{data.stock}</td>
              <td>{data.sales}</td>
              <td>
                <Link to={"/admin/" + data.id}>
                  <div
                    className={twMerge(
                      "p-2 mx-auto text-gray-500 border border-gray-500 rounded-md w-fit hover:bg-black/5",
                      "transition-all duration-200 cursor-pointer"
                    )}
                  >
                    Lihat Details
                  </div>
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
