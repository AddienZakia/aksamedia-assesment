import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";
import { twMerge } from "tailwind-merge";
import { GetDatabase } from "../utils/database";
import DashboardLayout from "../components/DashboardLayout";
import ModalAddProduct from "../components/Modal/ModalAddProduct";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import AuthCheck from "../components/AuthCheck";

function Admin() {
  const [modalAddProduct, setModalAddProduct] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const [pageNuqs, setPageNuqs] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    search: parseAsString.withDefault(""),
  });

  // set search value in state
  const onSearchChange = (e) => {
    const { value } = e.target;
    setSearch(value);

    setPageNuqs((pre) => ({
      ...pre,
      page: 1,
    }));
  };

  // filter changes
  const onFilterChange = (e) => {
    const { value } = e.target;
    setFilterValue(value);

    if (filterType !== "category") {
      setFilterType("");
      setFilterValue("");
    }

    const db = GetDatabase();
    const findData = db.filter((x) => x.category === value);
    setDataProducts(findData);
  };

  // on load
  useEffect(() => {
    setPageNuqs({
      page: pageNuqs.page || 1,
      search: pageNuqs.search || "",
    });

    const data = GetDatabase();
    setDataProducts(data);
    setSearch(pageNuqs.search);
  }, []);

  // if there any changes in search
  useEffect(() => {
    const db = GetDatabase();
    const findData = db.filter((x) => {
      return x.product.toLowerCase().includes(search);
    });

    setFilterType("");
    setFilterValue("");
    setDataProducts(findData);
    setPageNuqs((pre) => ({
      ...pre,
      search,
    }));
  }, [search]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-2 mt-3 md:items-center md:justify-between md:flex-row">
        <h1 className="text-3xl font-semibold dark:text-darkBlue-main">
          Data Produk
        </h1>

        <button
          className={twMerge(
            "w-fit flex items-center justify-center px-3 py-2 font-medium transition duration-200 rounded-md ",
            "text-white bg-darkBlue-main hover:bg-darkBlue-hover space-x-2"
          )}
          onClick={() => {
            setModalAddProduct(true);
          }}
        >
          <Plus />
          <span>Tambah produk</span>
        </button>
      </div>

      {/* Table Head */}
      <div className="mt-10 space-y-3">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Cari.."
            className="w-full p-3 px-6 text-base truncate bg-white shadow-sm dark:bg-darkMode-surface md:w-fit rounded-xl"
            onChange={onSearchChange}
            value={pageNuqs.search}
          />

          <div className="flex w-full gap-3 md:w-fit">
            <div className="relative flex items-center w-full pr-3 text-base font-medium text-gray-400 truncate bg-white shadow-sm dark:bg-darkMode-surface md:w-fit rounded-xl">
              <select
                id="filter"
                name="filter"
                className="w-full p-3 px-3 cursor-pointer md:w-fit dark:bg-darkMode-surface "
                onChange={(e) => setFilterType(e.target.value)}
                value={filterType}
              >
                <option value="">Filter</option>
                <option value="category">Category</option>
              </select>
            </div>

            {filterType === "category" && (
              <div className="relative flex items-center w-full pr-3 text-base font-medium text-gray-400 truncate bg-white shadow-sm md:w-fit rounded-xl">
                <select
                  name="category-filter"
                  id="category-filter"
                  className="w-full p-3 px-4 cursor-pointer md:w-fit"
                  onChange={onFilterChange}
                >
                  <option value="All">All</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Books">Books</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Table Body */}
        <Table DataProducts={dataProducts} currentPage={pageNuqs.page} />

        {/* Pagination */}
        <Pagination DataProducts={dataProducts} />
      </div>

      {/* Modal Add Produk */}
      <ModalAddProduct
        setModalAddProduct={setModalAddProduct}
        modalAddProduct={modalAddProduct}
      />
    </DashboardLayout>
  );
}

export default function AdminMiddleware() {
  return (
    <AuthCheck>
      <Admin />
    </AuthCheck>
  );
}
