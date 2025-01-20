import React, { useState } from "react";
import { oneHandleChange } from "../lib/FormHandler";
import SubmitButton from "./buttons/SubmitButton";
import { TrashIcon } from "lucide-react";
import CheckBox from "./input/CheckBox";

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

  console.log(result);

  return (
    <div className="mb-10 bg-secondary pb-10 px-10">
      <div className="flex flex-col items-center justify-center p-8 rounded-lg">
        {/* Kotak putaran */}
        <div className="text-white text-3xl">Spin machine</div>
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
          onClick={spin}
          disabled={isSpinning}
          className="bg-kuning text-gray-600 mt-10 p-2 rounded-sm"
        >
          SPINN!!!
        </button>
        {/* Hasil */}
        {result && !isSpinning && (
          <div className="mt-8 text-2xl font-bold text-white overflow-hidden">
            <span className="text-yellow-400">Hasil: </span> {result}
          </div>
        )}
      </div>

      {/* Daftar item */}
      <span className="text-xl font-semibold text-white">
        Item yang tersedia:{" "}
      </span>
      <div className="w-full flex-col bg-abutua mt-10 rounded-lg">
        <div className="flex flex-row justify-between p-5">
          <div className="flex flex-row gap-5">
            <button
              className="flex gap-1 p-1 rounded-md"
              onClick={handleClearAll}
            >
              <span className="text-red-500 ">Clear all</span>
            </button>
            {selectedItems.length > 0 && (
              <button className="flex gap-1 p-1 rounded-md">
                <span className="text-red">
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </span>
                <span className="text-red-500 ">Delete</span>
              </button>
            )}
          </div>
          <form action="" onSubmit={handleAddItem}>
            <div className="flex gap-10">
              <input
                value={value}
                onChange={(e) => oneHandleChange(e, setValue)}
                type="text"
                className="bg-abutua text-white border border-abumuda"
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
      {/* <div className="flex flex-row gap-7 justify-center">
        <div className="flex flex-col gap-10 text-white">
          <div className="flex gap-10">
            <input
              value={value}
              onChange={(e) => oneHandleChange(e, setValue)}
              type="text"
              className="bg-abutua"
            />
            <SubmitButton name="Add" func={handleAddItem} />
          </div>

          <div className="flex flex-row gap-5 ">
            <button
              className="flex gap-1 bg-abutua p-1 rounded-md hover:border hover:border-red-800"
              onClick={handleClearAll}
            >
              <span className="text-red">
                <TrashIcon className="h-5 w-5 text-red-500" />
              </span>
              <span className="text-red-500 ">Clear all</span>
            </button>
            <button className="flex gap-1 bg-abutua p-1 rounded-md hover:border hover:border-red-800">
              <span className="text-red">
                <TrashIcon className="h-5 w-5" />
              </span>
              <span className="">Delete</span>
            </button>
          </div>
        </div>
        <div className="mt-10 text-white">
          <h3 className="text-xl font-semibold mb-2">Item yang Tersedia:</h3>
          <div className="flex gap-4 flex-wrap justify-center p-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 bg-gray-800 p-2 rounded-lg"
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
      </div> */}
    </div>
  );
};

export default Spinner;
