import { ChevronDown, X } from "lucide-react";
import React, { useState } from "react";

const MultiSelect = ({ value = [], onChange, options = [], label }) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableItems = options.filter(
    (item) => !value.some((selectedId) => selectedId === item.id)
  );

  const removeItem = (itemId) => {
    const newValue = value.filter((id) => id !== itemId);
    onChange(newValue);
  };

  const addItem = (item) => {
    onChange([...value, item.id]);
    setIsOpen(false);
  };

  const selectedItems = options.filter((item) => value.includes(item.id));

  return (
    <div className="w-full relative">
      {/* dropdown button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 mt-1 text-left bg-white dark:bg-secondary text-gray-400 rounded-md focus:outline-none border-2 dark:border-abumuda focus:border-oren flex flex-row items-center justify-between"
      >
        <div className="">
          Add relation
          {availableItems.length > 0 && (
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
              {availableItems.length}
            </span>
          )}
        </div>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && availableItems.length > 0 && (
        <div className="absolute w-full z-10 mt-2 bg--gray rounded-md shadow-lg max-h-60 overflow-auto bg-putihsc border-2 dark:bg-secondary">
          {availableItems.map((item) => (
            <div
              className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
              onClick={() => addItem(item)}
              key={item.id}
            >
              <span className="text-kuning">{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Selected items */}
      <div className="mt-2 space-y-2">
        {selectedItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-400">⋮</span>
              <span className="text-kuning">{item.name}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-gray-300"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
