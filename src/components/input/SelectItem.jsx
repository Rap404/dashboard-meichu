import { ChevronDown } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const SelectItem = ({
  options,
  value,
  onChange,
  placeholder = "Select Option",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option.id);
    setIsOpen(false);
  };

  return (
    <div className="relative mt-1" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2.5 bg-secondary border border-zinc-700 
        rounded-lg flex items-center justify-between cursor-pointer
        hover:border-zinc-600 transition-colors duration-200
        ${isOpen ? "border-oren" : ""}`}
      >
        <span
          className={`block truncate ${
            selectedOption != 0 ? "text-gray-300" : "text-gray-400"
          }`}
        >
          {selectedOption != 0 ? selectedOption.name : placeholder}
        </span>
        <ChevronDown
          size={20}
          className={`text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-secondary border border-zinc-700 
          rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {options.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 cursor-pointer text-gray-300
                ${
                  index !== options.length - 1 ? "border-b border-zinc-700" : ""
                }
                ${
                  selectedOption?.id === option.id
                    ? "bg-amber-500/10 text-amber-500"
                    : "hover:bg-zinc-700"
                }`}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectItem;
