import React, { useState } from "react";

const SlotMachine = () => {
  const symbols = [
    "Rangga",
    "Azril",
    "Intan",
    "Bogeng",
    "Acengpilek",
    "aduhai",
    "gantengnya",
  ];

  const [reel, setReel] = useState({ position: 0, spinning: false });
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult("");

    // Simulate spinning with random steps
    const steps = 10 + Math.floor(Math.random() * 10); // Random number of spins
    const finalPosition = Math.floor(Math.random() * symbols.length); // Final position
    let currentStep = 0;

    const interval = setInterval(() => {
      setReel((prevReel) => ({
        ...prevReel,
        position: (prevReel.position + 1) % symbols.length,
      }));

      currentStep++;

      if (currentStep > steps) {
        clearInterval(interval);

        // Stop spinning and set final position
        setReel({ position: finalPosition, spinning: false });
        setIsSpinning(false);
        setTimeout(checkWin, 500);
      }
    }, 500); // Slower spin speed
  };

  const checkWin = () => {
    setResult(`Hasil: ${symbols[reel.position]} 🎉`);
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-gradient-to-br from-purple-600 to-blue-600">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-white mb-2">Slot Machine</h2>
      </div>

      <div className="flex justify-center mb-6">
        <div className="w-40 h-24 overflow-hidden bg-white rounded-lg relative shadow-lg">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${reel.position * 100}%)`,
            }}
          >
            {symbols.map((symbol, index) => (
              <div
                key={index}
                className="w-40 h-24 text-black flex-shrink-0 flex items-center justify-center text-4xl"
              >
                {symbol}
              </div>
            ))}
          </div>
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
