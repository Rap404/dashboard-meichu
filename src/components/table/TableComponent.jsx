import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import CheckBox from "../input/CheckBox";
import { baseUrl, mediaUrl } from "../../Constant";
import TableColumn from "./TableColumn";

const TableComponent = ({
  columns = [],
  data = [],
  onSearch,
  onSelectAll,
  onRowSelect,
  actions = [],
  pagination = true,
  isActions = true,
}) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // handle if data is an object with nested data array
    if (typeof data === "object" && !Array.isArray(data)) {
      setTableData(Array.isArray(data.data) ? data.data : []);
      return;
    }

    setTableData(Array.isArray(data) ? data : []);
  });

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  // Handle "select all" checkBox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      if (onSelectAll) onSelectAll([]);
    } else {
      const allIds = data.map((item) => item.id);
      setSelectedItems(allIds);
      if (onSelectAll) onSelectAll(allIds);
    }
    setSelectAll(!selectAll);
  };

  // Handle individual row selection
  const handleRowSelect = (id) => {
    const updatedSelection = selectedItems.includes(id)
      ? selectedItems.filter((selectedId) => selectedId !== id)
      : [...selectedItems, id];

    setSelectedItems(updatedSelection);
    if (onRowSelect) onRowSelect(updatedSelection);
  };

  return (
    <div className="me-6 mt-8 bg-zinc-900 border border-secondary rounded-xl">
      {/* search bar */}
      <div className="flex justify-between items-center px-5 py-2">
        {selectedItems.length > 0 ? (
          <div className="flex gap-2 items-center">
            <div className="">
              <span className="text-white text-sm">
                {selectedItems.length} items Selected
              </span>
            </div>
            <div className="">
              <button className="flex gap-1 bg-abutua p-1 rounded-md hover:border hover:border-red-800">
                <span className="text-red">
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </span>
                <span className="text-red-500">Delete</span>
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="bg-white"></div>
        <div className="relative m-2">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 bg-abutua border border-abumuda rounded-lg text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full bg-hitam">
        <thead>
          <tr className="border-b border-zinc-800 bg-abutua">
            <th className="w-8 py-3 px-4">
              <CheckBox onChange={handleSelectAll} checked={selectAll} />
            </th>
            <th className="w-8 py-3 px-4">
              <span className="text-gray-300 font-medium">No</span>
            </th>
            {columns.map((col, index) => (
              <th
                key={index}
                className="text-center py-3 px-6 text-gray-300 font-medium"
              >
                {col.header}
              </th>
            ))}
            {isActions ? (
              <th className="text-right py-3 px-11 text-gray-300 font-medium">
                {""}
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr
              key={index}
              className={`border-b border-zinc-800 hover:bg-abutua bg-secondary `}
            >
              <td className="py-4 px-6">
                <CheckBox
                  onChange={() => handleRowSelect(item.id)}
                  checked={selectedItems.includes(item.id)}
                />
              </td>

              <td className="py-4 px-6">
                <span className="text-gray-300 font-medium">{index + 1}</span>
              </td>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="text-center justify-center py-4 px-4 text-gray-300 text-sm"
                >
                  <TableColumn item={col} data={item} />
                </td>
              ))}
              {isActions ? (
                <td className="py-4 pe-11 text-right">
                  <div className="flex justify-end gap-2">
                    <button>
                      <span className="text-abumuda hover:text-oren">
                        <PencilIcon className="text-red w-5 h-5" />
                      </span>
                    </button>
                    <button>
                      <span className="text-abumuda hover:text-red-500">
                        <TrashIcon className="text-red w-5 h-5" />
                      </span>
                    </button>
                  </div>
                </td>
              ) : (
                ""
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center text-white p-2">
          <div className="w-auto absolute items-center">
            <span className="text-sm p-4">
              Showing {tableData.length} results
            </span>
          </div>
          <div className="flex items-center w-full justify-center">
            <div className="rounded-lg p-2">
              <span className="px-2 text-sm">Per page</span>
              <select className="bg-zinc-800 rounded px-2 py-1 text-gray-300 text-sm">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;
