import React, { useState, useEffect, useCallback } from "react";
import { RefreshCw, Play, RotateCcw } from "lucide-react";

const RollingMachine = () => {
  const [slotSymbols, setSlotSymbols] = useState([]);
  const [slots, setSlots] = useState([]);
  const [spinPositions, setSpinPositions] = useState([0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinAmount, setSpinAmount] = useState("");
  const [spinDeirection, setSpinDirection] = useState("up");

  const shuffleArray = useCallback((array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  useEffect(() => {
    const initialSlotSymbols = [
      ["🍰", "🍪", "🎂", "🍰", "🍫", "🍬", "🍭", "🍮", "🍦", "🍨", "🍧", "🍥"],
    ];
    setSlotSymbols(initialSlotSymbols.map((group) => [...group, ...group]));
  }, []);

  useEffect(() => {
    if (slotSymbols.length > 0) {
      const initialSlots = slotSymbols.map((symbolGroup) =>
        shuffleArray(symbolGroup)
      );
      setSlots(initialSlots);
    }
  }, [shuffleArray, slotSymbols]);

  const spin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);

    const directionMultiplier = spinDeirection === "up" ? -1 : 1;
    // const newPosition =
    // Math.floor(Math.random() * 9) * 85 * directionMultiplier;

    const newPosition = -100;
    setSpinPositions([newPosition]);

    setTimeout(() => {
      setIsSpinning(false);
    }, 4000);
  }, [isSpinning, spinDeirection]);

  const reset = useCallback(() => {
    setSpinPositions([0]);
    const initialSlots = slotSymbols.map((symbolGroup) =>
      shuffleArray(symbolGroup)
    );
    setSlots(initialSlots);
  }, [slotSymbols, shuffleArray]);

  const autoSpin = () => {
    const amount = parseInt(spinAmount, 10);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid number of spins");
      return;
    }

    let spinCount = 0;
    const autoSpinInterval = setInterval(() => {
      spin();
      spinCount++;

      if (spinCount >= amount) {
        clearInterval(autoSpinInterval);
      }
    }, 4500);
  };

  return (
    <div className="bg-[#212121] min-h-screen flex flex-col items-center justify-center">
      <div className="slotcontainer flex justify-center items-center mb-5">
        {slots.map((slotGroup, index) => (
          <div
            key={index}
            className="slot w-[100px] h-[267.5px] border border-black rounded-[7.5px] inline-block overflow-hidden relative bg-[#fafafa] shadow-inner"
          >
            <div
              style={{
                position: "absolute",
                top: `${spinPositions[index]}px`,
                transition: isSpinning
                  ? "top 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
                  : "none",
              }}
            >
              {slotGroup.map((symbol, idx) => (
                <div
                  key={idx}
                  className="symbol w-[100px] h-[85px] text-[60px] leading-[100px] block text-center"
                >
                  {symbol}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="levercontainer relative ml-5">
          <div
            onClick={spin}
            className="levertip bg-red-500 h-[55px] w-[55px] rounded-full relative shadow-inner cursor-pointer"
          ></div>
          <div className="lever bg-gray-500 h-[250px] w-[25px] rounded-[10px] -mt-10 ml-[15px] shadow-inner"></div>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={spin}
          disabled={isSpinning}
          className="mx-2.5 px-5 py-2.5 text-base border-none rounded-md bg-blue-500 text-white disabled:opacity-50"
        >
          Spin
        </button>
        <button
          onClick={reset}
          className="mx-2.5 px-5 py-2.5 text-base border-none rounded-md bg-yellow-500 text-white"
        >
          Reset
        </button>
        <hr className="dividerhr mx-2.5 my-0.5" />
        <input
          type="number"
          value={spinAmount}
          onChange={(e) => setSpinAmount(e.target.value)}
          placeholder="e.g. 25"
          className="spinAmount w-[60px] border-none rounded-md ml-2.5"
        />
        <button
          onClick={autoSpin}
          disabled={isSpinning}
          className="mx-2.5 px-5 py-2.5 text-base border-none rounded-md bg-green-500 text-white disabled:opacity-50"
        >
          Auto
        </button>
      </div>
    </div>
  );
};

export default RollingMachine;
