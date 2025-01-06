import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Pagination = ({
  data,
  totalPosts,
  value,
  postsPerPage,
  setCurrentPage,
  setPostPerPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const increasePage = () => {
    if (value < pages.length) {
      setCurrentPage(value + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const decreasePage = () => {
    if (value == 1) {
      setCurrentPage(pages.length);
    } else {
      setCurrentPage(value - 1);
    }
  };

  const getVisiblePages = () => {
    const totalPages = pages.length;
    const currentPage = value;
    const maxVisiblePages = 10;

    if (totalPages <= maxVisiblePages) {
      return pages;
    }

    let startPage, endPage;
    if (currentPage <= 5) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage > totalPages - 5) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - 4;
      endPage = currentPage + 5;
    }

    return pages.slice(startPage - 1, endPage);
  };

  return (
    <div className="flex justify-between min-w-full px-7 py-5 pt-10">
      <div className="items-center py-2">
        <span className="text-xs md:text-base lg:text-base text-gray-200">
          showing {data.length} results
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex gap-4 md:gap-6 lg:gap-8">
          <div className="py-2">
            <button className="text-white" onClick={decreasePage}>
              <ChevronDoubleLeftIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-4">
            {getVisiblePages().map((page, index) => {
              return (
                <div
                  className={`rounded-md p-2 ${
                    page == value ? "bg-abumuda" : "bg-abutua"
                  }`}
                  key={index}
                >
                  <button
                    className="text-white"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </div>
              );
            })}
          </div>
          <div className="py-2">
            <button className="text-white" onClick={increasePage}>
              <ChevronDoubleRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <div className="rounded-lg p-2">
          <span className="hidden lg:inline-block px-2 text-sm text-gray-300">
            Per page
          </span>
          <select
            className="bg-zinc-800 rounded px-2 py-1 text-gray-300 text-sm"
            onChange={(e) => setPostPerPage(e.target.value)}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
