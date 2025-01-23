import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CheckBox from "../input/CheckBox";
import TableColumn from "./TableColumn";
import Pagination from "./Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import SearchInput from "../input/SearchInput";

const TableComponent = ({
  columns = [],
  data = [],
  searchQuery,
  setSearchQuery,
  onSelectAll,
  setSelectedId,
  setSelectedIds,
  selectedIds,
  setModalOpen,
  pagination = true,
  isActions = true,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDetail, setIsDetail] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const lastPostindex = currentPage * postPerPage;
  const firstPostIndex = lastPostindex - postPerPage;
  const currentPosts = tableData.slice(firstPostIndex, lastPostindex);

  const handleDetail = () => {
    if (location.pathname === "/requests") {
      setIsDetail(true);
    }
  };

  useEffect(() => {
    handleDetail();
    if (typeof data === "object" && !Array.isArray(data)) {
      setTableData(Array.isArray(data.data) ? data.data : []);
      return;
    }

    setTableData(Array.isArray(data) ? data : []);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
      if (onSelectAll) onSelectAll([]);
    } else {
      const allIds = currentPosts.map((item) => item.attributes.uuid);
      setSelectedIds(allIds);
      if (onSelectAll) onSelectAll(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleRowSelect = (id) => {
    const updatedSelection = selectedIds.includes(id)
      ? selectedIds.filter((selectedId) => selectedId !== id)
      : [...selectedIds, id];

    setSelectedIds(updatedSelection);

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

  const handleEditPage = (id) => {
    if (!id) return null;

    if (isDetail == true) {
      navigate(`${location.pathname}/detail/${id}`);
    } else {
      navigate(`${location.pathname}/edit/${id}`);
    }
  };

  return (
    <div className="me-6 mt-8 bg-white dark:bg-secondary border border-2-secondary dark:border-secondary rounded-xl overflow-x-auto">
      {/* search bar */}
      <div className="flex justify-between items-center px-5 py-2">
        {selectedIds.length > 0 ? (
          <div className="flex flex-col md:flex-row lg:flex-row gap-2 items-center">
            <div className="">
              <span className="text-hitam dark:text-white text-sm flex-col">
                {selectedIds.length} items Selected
              </span>
            </div>
            <div className="">
              <button
                className="flex gap-1 dark:bg-abutua p-1 rounded-md hover:bg-red-100 dark:hover:border hover:border-red-800"
                onClick={() => setModalOpen(true)}
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
        <SearchInput value={searchQuery} onChange={handleSearch} />
      </div>

      <div className="overflow-x-auto">
        {/* Table */}
        <table className="w-full bg-white dark:bg-hitam">
          <thead>
            <tr className="border border-2-abutua dark:border-abutua bg-putihtrd dark:bg-abutua">
              {isActions ? (
                <th className="w-8 py-3 px-4">
                  <CheckBox onChange={handleSelectAll} checked={selectAll} />
                </th>
              ) : (
                <th></th>
              )}

              <th className="w-8 py-3 px-4">
                <span className="text-hitam dark:text-gray-300 font-medium">
                  No
                </span>
              </th>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="text-center py-3 ps-6 text-hitam dark:text-gray-300 font-medium"
                >
                  {col.header}
                </th>
              ))}
              {isDetail && <th></th>}
              {isActions ? (
                <th className="text-right py-3 ps-6 md:ps-0 lg:ps-0 pe-11 text-hitam dark:text-gray-300 font-medium">
                  Actions
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          {data === undefined || data.length === 0 ? (
            ""
          ) : (
            <>
              <tbody>
                {currentPosts.map((item, index) => (
                  <tr
                    key={index}
                    className={`border-b border-2-abutua dark:border-abutua hover:bg-putihtrd dark:hover:bg-abutua bg-putihsc dark:bg-secondary z-0`}
                    onClick={() => handleEditPage(item?.attributes?.uuid)}
                  >
                    {isActions ? (
                      <td className="py-4 px-6">
                        <CheckBox
                          onChange={(e) => {
                            e.stopPropagation();
                            handleRowSelect(item.attributes.uuid);
                          }}
                          checked={selectedIds.includes(item?.attributes?.uuid)}
                        />
                      </td>
                    ) : (
                      <td></td>
                    )}
                    <td className="py-4 px-6">
                      <span className="text-hitam dark:text-gray-300 font-medium">
                        {calculateRowNumber(index)}
                      </span>
                    </td>
                    {columns.map((col, colIndex) => (
                      <td
                        key={colIndex}
                        className="text-center justify-center py-4 ps-4 text-hitam dark:text-gray-300 text-sm"
                      >
                        <TableColumn item={col} data={item} />
                      </td>
                    ))}

                    {item?.attributes?.uuid && (
                      <td className="py-4 ps-4 md:ps-0 lg:ps-0 pe-11 text-right">
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
            </>
          )}
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
