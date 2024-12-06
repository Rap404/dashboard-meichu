import React, { useState } from "react";
import { assets } from "../assets/Assets";

const SpinMachine = ({ items = ["1", "2", "3", "4", "5"] }) => {
  const [isSpinning, setIsSpinning] = useState(false);
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
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Kotak Putaran */}
      <div className="text-white text-3xl">Spin Machine</div>
      <div
        className={`mt-10 w-32 h-32 flex items-center justify-center text-5xl 
          bg-gradient-to-r from-purple-500 to-pink-500 
          rounded-lg border-4 border-yellow-400 shadow-xl
          ${isSpinning ? "animate-pulse" : ""}`}
      >
        {items[currentItem]}
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
      {/* <button
        onClick={spin}
        disabled={isSpinning}
        className={`mt-8 px-8 py-4 text-xl font-bold text-white rounded-full overflow-hidden
          ${
            isSpinning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          } transition-all transform hover:scale-105`}
      >
        {isSpinning ? "Berputar..." : "PUTAR!"}
      </button> */}

      {/* Hasil */}
      {result && !isSpinning && (
        <div className="mt-8 text-2xl font-bold text-white">
          <span className="text-yellow-400">Hasil: </span> {result}
        </div>
      )}

      {/* Daftar Item */}
      <div className="mt-10 text-white">
        <h3 className="text-xl font-semibold mb-2">Item yang Tersedia:</h3>
        <div className="flex gap-4 flex-wrap justify-center">
          {items.map((item, index) => (
            <div key={index} className="bg-gray-800 p-2 rounded-lg">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinMachine;
