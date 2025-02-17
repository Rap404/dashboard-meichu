import React, { useState } from "react";
import { motion } from "framer-motion";

const SlotMachine = () => {
  const symbols = ["A", "B", "C", "D", "E", "F", "G"];
  const [reel, setReel] = useState({ position: 0, spinning: false });
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult("");

    const steps = Math.floor(Math.random() * 10);
    const finalPosition = Math.floor(Math.random() * symbols.length);
    console.log(finalPosition);
    let currentStep = 0;

    // console.log(finalPosition);
    const interval = setInterval(() => {
      setReel((prevReel) => ({
        ...prevReel,
        position: (prevReel.position + 1) % symbols.length,
      }));

      currentStep++;

      console.log(currentStep);

      if (currentStep > steps) {
        clearInterval(interval);

        setReel({ position: finalPosition, spinning: false });
        setIsSpinning(false);
        setTimeout(() => checkWin(finalPosition), 300);
        console.log(finalPosition);
      }
    }, 300);
  };

  const checkWin = (finalPosition) => {
    setResult(`Terpilih: ${symbols[finalPosition]}`);
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Slot Machine</h2>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-10 h-24 overflow-hidden bg-white rounded-lg relative shadow-lg">
          <motion.div
            className="flex"
            animate={{
              x: -reel.position * 100 + "%",
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            {symbols.map((symbol, index) => (
              <div
                key={index}
                className="w-10 h-24 text-black flex-shrink-0 flex items-center justify-center text-4xl font-bold"
              >
                {symbol}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105"
        >
          {isSpinning ? "Berputar..." : "PUTAR!"}
        </button>

        {result && (
          <div className="mt-4 text-xl font-bold text-white">{result}</div>
        )}
      </div>
    </div>
  );
};

export default SlotMachine;
