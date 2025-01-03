import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CheckBox from "../input/CheckBox";
import TableColumn from "./TableColumn";
import Pagination from "./Pagination";
import { useLocation, useNavigate } from "react-router-dom";

const TableComponent = ({
  columns = [],
  data = [],
  onSearch,
  onSelectAll,
  setSelectedId,
  multiDelFunc,
  setModalOpen,
  pagination = true,
  isActions = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostindex = currentPage * postPerPage;
  const firstPostIndex = lastPostindex - postPerPage;
  const currenPosts = tableData.slice(firstPostIndex, lastPostindex);

  useEffect(() => {
    if (typeof data === "object" && !Array.isArray(data)) {
      setTableData(Array.isArray(data.data) ? data.data : []);
      return;
    }

    setTableData(Array.isArray(data) ? data : []);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      if (onSelectAll) onSelectAll([]);
    } else {
      const allIds = data.map((item) => item.attributes.uuid);
      setSelectedItems(allIds);
      if (onSelectAll) onSelectAll(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id) => {
    const updatedSelection = selectedItems.includes(id)
      ? selectedItems.filter((selectedId) => selectedId !== id)
      : [...selectedItems, id];

    setSelectedItems(updatedSelection);

    if (updatedSelection.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };

  const handleRemoveItem = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const calculateRowNumber = (index) => {
    return (currentPage - 1) * postPerPage + index + 1;
  };

  return (
    <div className="me-6 mt-8 bg-zinc-900 border border-secondary rounded-xl overflow-x-hidden">
      {/* search bar */}
      <div className="flex justify-between items-center px-5 py-2">
        {selectedItems.length > 0 ? (
          <div className="flex flex-col md:flex-row lg:flex-row gap-2 items-center">
            <div className="">
              <span className="text-white text-sm flex-col">
                {selectedItems.length} items Selected
              </span>
            </div>
            <div className="">
              <button
                className="flex gap-1 bg-abutua p-1 rounded-md hover:border hover:border-red-800"
                onClick={multiDelFunc}
              >
                <span className="text-red">
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </span>
                <span className="text-red-500">Delete</span>
              </button>
            </div>
          </div>
        ) : (
          <div className=""></div>
        )}
        <div className="flex gap-2 items-center">
          <div className="relative w-full sm:w-auto m-2">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 bg-abutua border border-abumuda rounded-lg text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren"
            />
          </div>
          <div className="flex items-center bg-oren rounded-md px-1 h-10 ">
            <p className="text-white text-sm">Search</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Table */}
        <table className="w-full bg-hitam">
          <thead>
            <tr className="border-b border-zinc-800 bg-abutua">
              {isActions ? (
                <th className="w-8 py-3 px-4">
                  <CheckBox onChange={handleSelectAll} checked={selectAll} />
                </th>
              ) : (
                <th></th>
              )}

              <th className="w-8 py-3 px-4">
                <span className="text-gray-300 font-medium">No</span>
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-center py-3 ps-6 text-gray-300 font-medium"
                >
                  {col.header}
                </th>
              ))}
              {currenPosts[0]?.attributes?.isNew && <th></th>}
              {isActions ? (
                <th className="text-right py-3 pe-11 text-gray-300 font-medium">
                  Actions
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {currenPosts.map((item, index) => (
              <tr
                key={index}
                className={`border-b border-zinc-800 hover:bg-abutua bg-secondary z-0`}
                onClick={() =>
                  navigate(`${location.pathname}/edit/${item.attributes.uuid}`)
                }
              >
                {isActions ? (
                  <td className="py-4 px-6">
                    <CheckBox
                      onChange={(e) => {
                        e.stopPropagation();
                        handleRowSelect(item.attributes.uuid);
                      }}
                      checked={selectedItems.includes(item?.attributes?.uuid)}
                    />
                  </td>
                ) : (
                  <td></td>
                )}
                <td className="py-4 px-6">
                  <span className="text-gray-300 font-medium">
                    {calculateRowNumber(index)}
                  </span>
                </td>
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="text-center justify-center py-4 ps-4 text-gray-300 text-sm"
                  >
                    <TableColumn item={col} data={item} />
                  </td>
                ))}

                {item?.attributes?.uuid && (
                  <td className="py-4 pe-11 text-right">
                    <div className="flex justify-end gap-2">
                      {isActions ? (
                        <button
                          onClick={() =>
                            navigate(
                              `${location.pathname}/edit/${item.attributes.uuid}`
                            )
                          }
                        >
                          <span className="text-abumuda hover:text-oren">
                            <PencilIcon className="text-red w-5 h-5" />
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item.attributes.uuid);
                        }}
                      >
                        <span className="text-abumuda hover:text-red-500">
                          <TrashIcon className="text-red w-5 h-5" />
                        </span>
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <Pagination
          data={tableData}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          value={currentPage}
          totalPosts={tableData.length}
          setPostPerPage={setPostPerPage}
        />
      )}
    </div>
  );
};

export default TableComponent;
