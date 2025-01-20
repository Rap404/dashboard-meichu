import React, { useState } from "react";
import { assets } from "../assets/Assets";
import CheckBox from "./input/CheckBox";
import { TrashIcon } from "lucide-react";
import Button from "./buttons/Button";
import SubmitButton from "./buttons/SubmitButton";
import { oneHandleChange } from "../lib/FormHandler";

const SpinMachine = ({}) => {
  const [items, setItems] = useState(["tes"]);
  const [value, setValue] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentItem, setCurrentTime] = useState(0);
  const [result, setResult] = useState(null);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    // jumlah putaran sebelum berhenti
    let spins = 0;
    const maxSpins = 20;

    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev + 1) % items.length);
      spins++;

      if (spins >= maxSpins) {
        clearInterval(interval);
        // Pilih item acak untuk hasil akhir
        const finalIndex = Math.floor(Math.random() * items.length);
        setCurrentTime(finalIndex);
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

  const handleAddItem = () => {
    if (value.trim()) {
      setItems((prev) => [...prev, value]);
      setValue("");
    }
  };

  console.log(value);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-lg shadow-lg">
      {/* Kotak Putaran */}
      <div className="text-white text-3xl">Spin Machine</div>
      <div
        className={`mt-10 w-64 h-40 flex items-center justify-center 
          bg-gradient-to-r from-purple-500 to-pink-500 
          rounded-lg border-4 border-yellow-400 shadow-xl
          ${isSpinning ? "animate-pulse" : ""}`}
      >
        <div className="flex justify-center text-center">
          <span className="text-3xl font-semibold">{items[currentItem]}</span>
        </div>
      </div>

      {/* Tombol Putar */}
      <button
        onClick={spin}
        disabled={isSpinning}
        // className={`max-w-40 max-h-40`}
      >
        <img
          className="mt-7 max-w-32 max-h-32 hover:max-w-36 hover:max-h-36 overflow-y-hidden"
          src={assets.start}
          alt=""
        />
      </button>

      {/* Hasil */}
      {result && !isSpinning && (
        <div className="mt-8 text-2xl font-bold text-white overflow-hidden">
          <span className="text-yellow-400">Hasil: </span> {result}
        </div>
      )}

      {/* Daftar Item */}
      <div className="flex flex-row gap-7 mt-20">
        <div className="flex flex-col gap-10 p-10 text-white">
          <div className="flex gap-10">
            <input
              value={value}
              onChange={(e) => oneHandleChange(e, setValue)}
              type="text"
              className="bg-abutua"
            />
            <SubmitButton name="Add" func={handleAddItem} />
          </div>

          <div className="flex flex-row gap-5">
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
          <div className="flex gap-4 flex-wrap justify-center bg-abumuda p-10">
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
      </div>
    </div>
  );
};

export default SpinMachine;
