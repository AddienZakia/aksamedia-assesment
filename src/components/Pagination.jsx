import { ChevronRight, ChevronLeft } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useEffect } from "react";
import { useQueryStates, parseAsString, parseAsInteger } from "nuqs";

export default function Pagination({ DataProducts }) {
  const totalData = 10; // total data per page
  const pageCount = Math.ceil(DataProducts.length / totalData);
  const [pageNuqs, setPageNuqs] = useQueryStates({
    page: parseAsInteger.withDefault(0),
    search: parseAsString.withDefault(""),
  });

  const currentPage = pageNuqs.page;

  useEffect(() => {
    setPageNuqs((pre) => ({
      ...pre,
      page: currentPage,
    }));
  }, [currentPage]);

  // Get List Page
  const ListPage = () => {
    if (pageCount < 5)
      return Array.from({ length: pageCount }).map((_, i) => i + 1);
    else {
      return Array.from({ length: 5 }).map((_x, i) => {
        if (currentPage >= 4 && currentPage <= pageCount - 2) {
          return currentPage - 2 + i;
        } else {
          if (currentPage >= pageCount - 1) {
            return pageCount - (4 - i);
          } else {
            return i + 1;
          }
        }
      });
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="font-medium">
        Page {currentPage} of {pageCount}
      </h2>
      <div className="flex items-center gap-1">
        <button
          className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => {
            setPageNuqs((pre) => ({
              ...pre,
              page: (pre.page -= 1),
            }));
          }}
        >
          <ChevronLeft size={20} />
        </button>
        {ListPage().map((pageIndex, index) => (
          <button
            key={index}
            className={twMerge(
              "flex px-3 py-2 font-medium transition-all duration-200 rounded-md hover:bg-darkBlue-main hover:text-white",
              pageIndex === currentPage &&
                "bg-darkBlue-main text-white px-3 py-2"
            )}
            onClick={() => {
              setPageNuqs((pre) => ({
                ...pre,
                page: pageIndex,
              }));
            }}
          >
            {pageIndex}
          </button>
        ))}
        <button
          className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={currentPage === pageCount}
          onClick={() => {
            setPageNuqs((pre) => ({
              ...pre,
              page: (pre.page += 1),
            }));
          }}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
