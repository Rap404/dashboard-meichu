import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrashIcon, X } from "lucide-react";
import SubmitButton from "./buttons/SubmitButton";
import ModalEntries from "./modal/ModalEntries";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import RadioButton from "./input/RadioButton";
import { FaSync } from "react-icons/fa";
import { fireConfetti } from "../assets/Assets";
import { errorNotif } from "./text/Notification";

const GachaPage = () => {
  const [items, setItems] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [gachaResult, setGachaResult] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [value, setValue] = useState("");
  const [rigged, setRigged] = useState(false);
  const [winningItemIndex, setWinningItemIndex] = useState(null);
  const [isSlow, setIsSlow] = useState(false);
  const spinContainerRef = useRef(null);
  const animationRef = useRef(null);
  const redLineRef = useRef(null);
  const itemRefs = useRef({});

  const emoticon = [
    "😀",
    "😁",
    "😋",
    "😎",
    "😮",
    "😜",
    "🥶",
    "🥴",
    "😠",
    "🥸",
    "👻",
    "🦖",
    "🦑",
    "❄️",
    "🔥",
    "⛄",
    "🌊",
  ];

  const getWinningItemPosition = (winningIndex) => {
    if (!redLineRef.current || !spinContainerRef.current) return 0;

    const containerRect = spinContainerRef.current.getBoundingClientRect();
    const redLineRect = redLineRef.current.getBoundingClientRect();
    const itemWidth = 160;
    const totalWidth = containerRect.width;

    const targetPosition = winningIndex * itemWidth + itemWidth / 2;
    const redLinePosition = redLineRect.left - containerRect.left;

    return targetPosition - redLinePosition;
  };

  const deleteSelectedItems = () => {
    const updatedItems = items.filter(
      (_, index) => !selectedItems.includes(index)
    );

    setItems(updatedItems);
    setSelectedItems([]);
  };

  const openGacha = () => {
    if (items.length < 3) {
      errorNotif("Data must be more than 3 to start the spin!");
      return;
    }
    setIsSpinning(true);
    setIsSlow(false);

    const duration = Math.floor(Math.random() * 10) + 3;
    if (rigged && winningItemIndex !== null) {
      setTimeout(() => {
        stopGacha();
      }, 5000);
    } else {
      console.log(duration);
      setTimeout(() => {
        stopGacha();
      }, duration * 1000);
    }
  };

  const closeGacha = () => {
    setSelectedItems(gachaResult);
    setGachaResult(null);
    deleteSelectedItems();
  };

  const getItemAtRedLine = () => {
    if (!redLineRef.current) return null;

    const redLineRect = redLineRef.current.getBoundingClientRect();
    const redLineX = redLineRect.x + redLineRect.width / 2;

    let closestItem = null;
    let minDistance = Infinity;

    Object.entries(itemRefs.current).forEach(([key, itemRef]) => {
      if (itemRef && itemRef.getBoundingClientRect) {
        const itemRect = itemRef.getBoundingClientRect();
        const itemCenterX = itemRect.x + itemRect.width / 2;
        const distance = Math.abs(itemCenterX - redLineX);

        if (distance < minDistance) {
          minDistance = distance;
          closestItem = key;
        }
      }
    });

    if (closestItem) {
      const [_, itemIndex] = closestItem.split("-").map(Number);
      return items[itemIndex];
    }

    return null;
  };

  const stopGacha = () => {
    if (animationRef.current) {
      const animation = animationRef.current;

      if (rigged && winningItemIndex !== null) {
        setIsSlow(true);

        setTimeout(() => {
          animation.pause();
          setIsSpinning(false);
          setGachaResult(items[winningItemIndex]);
          fireConfetti();
        }, 5000);
      } else {
        animation.playbackRate = 0.5;
        setTimeout(() => {
          animation.playbackRate = 0.2;

          setTimeout(() => {
            const selectedItem = getItemAtRedLine();

            animation.playbackRate = 0;
            setTimeout(() => {
              animation.cancel();
              setIsSpinning(false);
              fireConfetti();
              if (selectedItem) {
                setGachaResult(selectedItem);
              }
            }, 800);
          }, 1800);
        }, 3200);
      }
    }
  };

  const addMoreData = (e) => {
    e.preventDefault();
    const indexIcon = Math.floor(Math.random() * emoticon.length) + 1;
    if (value.trim()) {
      setItems((prev) => [
        ...prev,
        { name: value, emoticon: emoticon[indexIcon] },
      ]);
      setValue("");
    }
  };

  const addData = (e) => {
    e.preventDefault();

    const indexIcon = Math.floor(Math.random() * emoticon.length) + 1;
    if (value.trim()) {
      setItems((prev) => [
        ...prev,
        { name: value, emoticon: emoticon[indexIcon] },
      ]);
      setValue("");
    }
    setFormOpen(false);
  };

  const handleClearAll = () => {
    setItems([]);
    setSelectedItems([]);
  };

  const handleSelectItems = (id) => {
    const updateSelection = selectedItems.includes(id)
      ? selectedItems.filter((selectedItem) => selectedItem !== id)
      : [...selectedItems, id];

    setSelectedItems(updateSelection);
  };

  useEffect(() => {
    if (isSpinning && spinContainerRef.current) {
      const container = spinContainerRef.current;
      const totalWidth = container.scrollWidth / 3;
      let animation;

      if (rigged && winningItemIndex !== null && isSlow) {
        const targetPosition = getWinningItemPosition(winningItemIndex);
        const initialSpinDistance = totalWidth * 2;

        animation = container.animate(
          [
            { transform: "translateX(0)", easing: "linear" },
            {
              transform: `translateX(-${initialSpinDistance}px)`,
              easing: "linear",
              offset: 0.7,
            },
            {
              transform: `translateX(-${
                initialSpinDistance + targetPosition
              }px)`,
              easing: "cubic-bezier(0.1, 0.7, 0.1, 1.0)",
            },
          ],
          {
            duration: 3000,
            fill: "forwards",
          }
        );
      } else {
        let duration;
        if (!rigged) {
          const dura = Math.floor(Math.random() * items.length) + 2;
          duration = dura * 155;
        } else {
          duration = 1000;
        }
        animation = container.animate(
          [
            { transform: "translateX(0)" },
            { transform: `translateX(-${totalWidth}px)` },
          ],
          {
            duration: duration,
            iterations: Infinity,
            easing: "linear",
          }
        );
      }

      animationRef.current = animation;

      return () => {
        if (animationRef.current) {
          animationRef.current.cancel();
        }
      };
    }
  }, [isSpinning, rigged, winningItemIndex, isSlow]);
  const renderSpinningItems = () => {
    return (
      <div className="flex">
        {[0, 1, 2].map((setIndex) => (
          <div key={setIndex} className="flex">
            {items.map((item, itemIndex) => (
              <div
                key={`${setIndex}-${itemIndex}`}
                ref={(el) => {
                  if (el) {
                    itemRefs.current[`${setIndex}-${itemIndex}`] = el;
                  }
                }}
                className="flex-shrink-0 w-40 p-2"
                style={{ height: "160px" }}
              >
                <div className=" rounded-lg p-2 h-full border border-oren flex flex-col items-center justify-center">
                  <span className="text-3xl">{item.emoticon}</span>
                  <p className="text-lg font-medium text-center truncate w-full">
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
            {rigged && winningItemIndex !== null && (
              <>
                <div
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[setIndex - 0] = el;
                    }
                  }}
                  className="flex-shrink-0 w-40 p-2"
                  style={{ height: "160px" }}
                >
                  <div className=" rounded-lg p-2 h-full border border-oren flex flex-col items-center justify-center">
                    <span className="text-3xl">{items[0]?.emoticon}</span>
                    <p className="text-lg font-medium text-center truncate w-full">
                      {items[0].name}
                    </p>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[setIndex - 1] = el;
                    }
                  }}
                  className="flex-shrink-0 w-40 p-2"
                  style={{ height: "160px" }}
                >
                  <div className=" rounded-lg p-2 h-full border border-oren flex flex-col items-center justify-center">
                    <span className="text-3xl">{items[1]?.emoticon}</span>
                    <p className="text-lg font-medium text-center truncate w-full">
                      {items[1].name}
                    </p>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[setIndex - 2] = el;
                    }
                  }}
                  className="flex-shrink-0 w-40 p-2"
                  style={{ height: "160px" }}
                >
                  <div className=" rounded-lg p-2 h-full border border-oren flex flex-col items-center justify-center">
                    <span className="text-3xl">{items[2]?.emoticon}</span>
                    <p className="text-lg font-medium text-center truncate w-full">
                      {items[2].name}
                    </p>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    if (el) {
                      itemRefs.current[setIndex - 3] = el;
                    }
                  }}
                  className="flex-shrink-0 w-40 p-2"
                  style={{ height: "160px" }}
                >
                  <div className=" rounded-lg p-2 h-full border border-oren flex flex-col items-center justify-center">
                    <span className="text-3xl">{items[3]?.emoticon}</span>
                    <p className="text-lg font-medium text-center truncate w-full">
                      {items[3].name}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderControls = () => {
    if (isSpinning) return null;

    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rigged}
            onChange={(e) => setRigged(e.target.checked)}
            className="form-checkbox h-4 w-4"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Set Winning Item
          </label>
        </div>

        {rigged && (
          <select
            value={winningItemIndex || ""}
            onChange={(e) => setWinningItemIndex(Number(e.target.value))}
            className="form-select mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="">Select winning item</option>
            {items.map((item, index) => (
              <option key={index} value={index}>
                {item.emoticon} {item.name}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  };

  return (
    <div
      className={`${
        isFull && "fixed inset-0 w-screen h-screen overflow-y-auto"
      }`}
    >
      <div className="w-full h-screen flex flex-col gap-10 bg-putihtrd dark:bg-abutua px-10 pb-20">
        <div className="">
          <div className="w-full flex justify-end pt-10">
            <button
              onClick={() => setIsFull((prev) => !prev)}
              className="w-5 h-5 text-hitam dark:text-white"
            >
              {isFull ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
            </button>
          </div>

          <h1 className="text-4xl font-bold text-center text-hitam dark:text-white">
            🎰 Gacha Machine!!! 📍
          </h1>
        </div>
        {isSpinning && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 transition-opacity"
            aria-hidden="true"
          ></div>
        )}

        <div className="w-full flex flex-col gap-10 items-center justify-center">
          <div className="md:w-4/5 lg:w-4/5 border dark:border-abutua bg-putihfrt dark:bg-secondary p-10">
            <h2 className="text-2xl font-semibold text-center text-hitam dark:text-white">
              {isSpinning ? "Spinning..." : "Add Data to start the spin!"}
            </h2>
            {isSpinning ? (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    scale: { type: "spring" },
                  }}
                  exit={{ opacity: 0 }}
                  className="relative mt-40 bg-putihtrd text-hitam dark:text-white dark:bg-secondary  mb-36 p-20 z-30 overflow-hidden"
                >
                  <div
                    ref={redLineRef}
                    className="absolute left-1/2 top-0 bottom-0 w-1 bg-red-500 z-10"
                  ></div>
                  <div
                    ref={spinContainerRef}
                    className="absolute left-0 top-0 bottom-0"
                  >
                    {renderSpinningItems()}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <>
                <div className="h-80 mt-10 overflow-y-auto">
                  <div className="grid p-10 grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelectItems(index)}
                        className="w-full flex flex-row bg-putihfrt dark:bg-secondary dark:text-white items-center text-center gap-2 px-2 lg:px-5 py-5 rounded-lg border-abumuda border-r-2 border-b-2 overflow-hidden"
                      >
                        <RadioButton
                          checked={selectedItems.includes(index)}
                          onChange={() => handleSelectItems(index)}
                        />
                        <h3 className="">
                          {" "}
                          {item.emoticon} {item.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row lg:flex-row w-full justify-between items-center gap-5 pt-10">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col items-start">
                      <button
                        className={`flex text-red-500 pe-10 ${
                          selectedItems.length === 0 && "mt-4"
                        }`}
                        onClick={handleClearAll}
                      >
                        <span className="">Clear All</span>
                      </button>
                      {selectedItems.length > 0 && (
                        <button
                          className="flex text-red-500 gap-1"
                          onClick={deleteSelectedItems}
                        >
                          <p className="">
                            Delete{" "}
                            <span className="">{selectedItems.length}</span>{" "}
                            Items
                          </p>
                          <span className="mt-1 hidden">
                            <TrashIcon className="h-4 w-4" />
                          </span>
                        </button>
                      )}
                    </div>

                    <div className=" md:hidden lg:hidden">
                      <SubmitButton
                        name="Tambah Data"
                        func={() => setFormOpen(true)}
                      />
                    </div>
                  </div>

                  <button
                    className="bg-oren p-3 rounded-full"
                    onClick={openGacha}
                  >
                    <FaSync className="size-8 dark:text-white" />
                  </button>

                  <div className="hidden md:block lg:block">
                    <SubmitButton
                      name="Tambah Data"
                      func={() => setFormOpen(true)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {renderControls()}

        <AnimatePresence>
          {gachaResult && (
            <>
              <div
                className="fixed inset-0 bg-opacity-75 bg-black transition-opacity"
                aria-hidden="true"
              ></div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  scale: { type: "spring" },
                }}
                exit={{ opacity: 0 }}
                className="fixed inset-0  bg-opacity-50 flex items-center justify-center"
                onClick={closeGacha}
              >
                <div className="bg-white dark:bg-secondary z-10 rounded-lg py-10 md:p-10 lg:p-10 w-11/12 max-w-2xl">
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2"></div>
                    <h2 className="text-2xl text-black dark:text-putihfrt font-bold text-center">
                      🎉😮👍 CONGRATULATION 🤟😜🎉
                    </h2>
                    <button
                      onClick={closeGacha}
                      className="text-white hover:text-gray-700"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex flex-col items-center text-center gap-10 p-10">
                    <span className="text-8xl">{gachaResult.emoticon}</span>
                    <h3 className="text-4xl text-black dark:text-putihfrt font-bold mb-2">
                      <span>{gachaResult.name}</span>
                    </h3>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {formOpen && (
          <ModalEntries
            closeModal={() => setFormOpen(false)}
            value={value}
            setValue={setValue}
            addMoreData={addMoreData}
            addData={addData}
          />
        )}
      </div>
    </div>
  );
};

export default GachaPage;
