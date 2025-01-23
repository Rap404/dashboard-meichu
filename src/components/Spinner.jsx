import React, { useState } from "react";
import { oneHandleChange } from "../lib/FormHandler";
import SubmitButton from "./buttons/SubmitButton";
import { TrashIcon } from "lucide-react";
import CheckBox from "./input/CheckBox";
import { assets } from "../assets/Assets";

const Spinner = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [result, setResult] = useState(null);
  const [items, setItems] = useState(["Data"]);
  const [value, setValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    let spins = 0;
    const maxSpins = 20;

    const interval = setInterval(() => {
      setCurrentItem((prev) => (prev + 1) % items.length);
      spins++;

      if (spins >= maxSpins) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * items.length);
        setCurrentItem(finalIndex);
        setResult(items[finalIndex]);
        setIsSpinning(false);
      }
    }, 100);
  };

  const handleSelectItems = (id) => {
    const updateSelection = selectedItems.includes(id)
      ? selectedItems.filter((selectedItem) => selectedItem !== id)
      : [...selectedItems, id];

    setSelectedItems(updateSelection);
  };

  const handleClearAll = () => {
    setItems([]);
  };

  const handleAddItem = (e) => {
    e?.preventDefault();
    if (value.trim()) {
      setItems((prev) => [...prev, value]);
      setValue("");
    }
  };

  return (
    <div className="mb-20 bg-putihtrd dark:bg-secondary border-2 dark:border-secondary pb-10 px-10">
      <div className="flex flex-col items-center justify-center p-8 rounded-lg">
        {/* Kotak putaran */}
        <div className="dark:text-white text-3xl">Spin machine</div>
        <div
          className={`mt-10 w-64 h-40 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg border-4 border-yellow-400 shadow-xl ${
            isSpinning ? "animate-pulse" : ""
          }`}
        >
          <div className="flex justify-center text-center">
            <span className="text-3xl font-semibold">{items[currentItem]}</span>
          </div>
        </div>
        <button
          className="mt-10 w-48 cursor-pointer"
          onClick={spin}
          disabled={isSpinning}
        >
          <img src={assets.start} alt="" />
        </button>
        {/* Hasil */}
        {result && !isSpinning && (
          <div className="mt-8 text-2xl font-bold dark:text-white overflow-hidden">
            <span className="">Hasil: </span>
            <span className="text-yellow-400"> {result}</span>
          </div>
        )}
      </div>

      {/* Daftar item */}
      <span className="text-xl font-semibold dark:text-white">
        Item yang tersedia:{" "}
      </span>
      <div className="w-full flex-col border-2 dark:border-secondary bg-putihsc dark:bg-abutua mt-10 rounded-lg">
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-row gap-5 items-center">
            <button className="flex rounded-md" onClick={handleClearAll}>
              <span className="text-red-500">Clear all</span>
            </button>
            {selectedItems.length > 0 && (
              <button className="flex rounded-md hover:text-red-500">
                <span className="">
                  <TrashIcon className="h-5 w-5" />
                </span>
                <span className="">Delete</span>
              </button>
            )}
          </div>
          <form action="" onSubmit={handleAddItem}>
            <div className="flex gap-10">
              <input
                value={value}
                onChange={(e) => oneHandleChange(e, setValue)}
                type="text"
                className="dark:bg-abutua dark:text-white border border-abumuda p-1"
              />
              <SubmitButton name="Add" func={(e) => handleAddItem(e)} />
            </div>
          </form>
        </div>

        <div className="flex gap-4 flex-wrap justify-center p-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 bg-gray-800 p-2 rounded-lg text-white"
            >
              <CheckBox
                onChange={() => handleSelectItems(index)}
                checked={selectedItems.includes(index)}
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Spinner;
