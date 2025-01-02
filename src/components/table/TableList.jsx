import {
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { assets } from "../../assets/Assets";
import CheckBox from "../input/CheckBox";

const TableList = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const categories = [
    { id: "1", name: "all", icon: {} },
    { id: "2", name: "Gym", icon: {} },
    { id: "3", name: "Running", icon: {} },
    { id: "4", name: "Sandal", icon: {} },
    { id: "5", name: "Basketball", icon: {} },
  ];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(list.map((cat) => cat.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (categoryId) => {
    setSelectedItems((prevSelected) => {
      const isCurrentlySelected = prevSelected.includes(categoryId);
      let newSelected;

      if (isCurrentlySelected) {
        // Remove item if it's currently selected
        newSelected = prevSelected.filter((id) => id !== categoryId);
      } else {
        // Add item if it's not currently selected
        newSelected = [...prevSelected, categoryId];
      }

      // Update selectAll state based on whether all items are selected
      setSelectAll(newSelected.length === categories.length);

      return newSelected;
    });
  };

  // Helper function to check if an item is selected
  const isItemSelected = (categoryId) => {
    return selectedItems.includes(categoryId);
  };

  return (
    <div className=" me-6 mt-8 bg-zinc-900 border border-secondary rounded-xl">
      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative m-2">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
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
            <th className="text-left py-3 px-4 text-gray-300 font-medium">
              Name
            </th>
            <th className="text-left py-3 px-4 text-gray-300 font-medium">
              slug
            </th>
            <th className="text-left py-3 px-4 text-gray-300 font-medium">
              product count
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr
              key={index}
              className="border-b border-zinc-800 bg-secondary hover:bg-abutua"
            >
              <td className="py-4 px-6">
                <CheckBox
                  onChange={() => handleSelectItem(item.id)}
                  checked={isItemSelected(item.id)}
                />
              </td>
              <td className="py-4 px-4 text-gray-300">{item.name}</td>
              <td className="py-4 px-4">
                <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
                  <img
                    src={assets.photo_profile}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </td>
              <td className="w-24 py-4 px-4 text-right flex gap-7">
                <button className="text-red-500 hover:text-red-600">
                  <span className="flex items-center">
                    <TrashIcon className="w-4 h-4 mr-1" />
                    Delete
                  </span>
                </button>
                <button className="text-amber-500 hover:text-amber-600">
                  <span className="flex items-center">
                    <PencilSquareIcon className="w-4 h-4 mr-1" />
                    Edit
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center text-white p-2">
        <div className="w-auto absolute items-center">
          <span className="text-sm p-4">Showing 1 results</span>
        </div>
        <div className="flex items-center w-full justify-center">
          <div className="rounded-lg p-2">
            <span className="px-2 text-sm">Per page</span>
            <select className="bg-zinc-800 rounded px-2 py-1 text-gray-300 text-sm ">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableList;
