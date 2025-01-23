import React, { State, useEffect, useState } from "react";
import { oneHandleChange } from "../lib/FormHandler";
import SubmitButton from "./buttons/SubmitButton";
import { motion } from "framer-motion";
import CheckBox from "./input/CheckBox";
import { FaFontAwesome, FaSync } from "react-icons/fa";
import { PlusIcon } from "@heroicons/react/24/solid";
import { TrashIcon } from "@heroicons/react/24/outline";
import ModalEntries from "./modal/ModalEntries";
import { errorNotif } from "./text/Notification";

const CardShuffler = () => {
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    let intervalId;

    if (isSpinning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * items.length);
        setCurrentIndex(randomIndex);
      }, 100);
    }

    return () => clearInterval(intervalId);
  }, [isSpinning]);

  const handleSpin = () => {
    if (items.length >= 3) {
      setIsSpinning(true);
      setTimeout(() => {
        setIsSpinning(false);
      }, 3000); // Stop spinning after 3 seconds
    } else {
      errorNotif("Please add more data to spin!");
    }
  };

  const getSlideIndex = (index) => {
    const newIndex = (index + items.length) % items.length;
    return newIndex;
  };

  const clearAll = () => {
    setItems([]);
  };

  const addMoreData = (e) => {
    e.preventDefault();
    if (value.trim()) {
      setItems((prev) => [...prev, value]);
      setValue("");
    }
  };

  const addData = (e) => {
    e.preventDefault();
    if (value.trim()) {
      setItems((prev) => [...prev, value]);
      setValue("");
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 my-10 lg:px-40 overflow-auto">
      <p className="text-3xl font-bold dark:text-white">
        {isSpinning
          ? "Hold on! We're still choosing the winner"
          : "Add Data to Start the Spin!"}
      </p>

      <div className="w-full">
        <div className="relative max-w-3xl mx-auto overflow-hidden flex items-center justify-center">
          <div className="flex w-full items-center justify-center gap-20">
            {/* Previouse card */}
            <motion.div
              className="relative w-1/2 h-64 rounded-lg shadow-lg dark:bg-secondary border border-orengelap flex items-center justify-center dark:text-white text-lg"
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 0.8, opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              {items[getSlideIndex(currentIndex - 1)] || "No Entries"}
            </motion.div>
            {/* Current card */}
            <motion.div
              className="absolute w-1/2 h-64 z-10 rounded-lg shadow-lg dark:bg-secondary border border-orengelap flex items-center justify-center text-white text-2xl font-bold"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orengelap to-ijokepong rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative w-full h-full border border-orengelap text-hitam dark:text-white bg-white dark:bg-secondary rounded-lg leading-none flex items-center justify-center space-x-6">
                <p>{items[getSlideIndex(currentIndex)] || "No Entries"}</p>
              </div>
            </motion.div>
            {/* Next card */}
            <motion.div
              className="relative w-1/2 h-64 rounded-lg shadow-lg border border-ijokepong dark:bg-secondary flex items-center justify-center dark:text-white text-lg "
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 0.8, opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              {items[getSlideIndex(currentIndex + 1)] || "No Entries"}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-col">
          <button className="flex text-red-500" onClick={clearAll}>
            <span className="">Clear All</span>
          </button>
          <button className="flex text-red-500 gap-1">
            <span className="">Delete Items</span>
            <span className="mt-1">
              <TrashIcon className="h-4 w-4" />
            </span>
          </button>
        </div>
        <button
          className="bg-gradient-to-r from-orengelap to-ijokepong p-3 rounded-full"
          onClick={handleSpin}
        >
          <FaSync className="size-8 dark:text-white" />
        </button>
        <div className="">
          <button
            className="bg-gradient-to-r from-orengelap to-ijokepong rounded-lg dark:text-white p-2"
            onClick={() => setModalOpen(true)}
          >
            <div className="flex flex-row gap-3">
              <span className="w-6">
                <PlusIcon />
              </span>
              Add Data
            </div>
          </button>
        </div>
      </div>
      {/* Daftar isi */}
      <div className="w-full grid grid-cols-4 gap-9">
        {items.map((name, index) => (
          <div
            key={index}
            className="flex flex-row bg-secondary text-white text-center gap-2 p-2 rounded-lg border-abumuda border-r-2 border-b-2"
          >
            <input type="radio" name="" id="" />
            <div className="text-lg">{name}</div>
          </div>
        ))}
      </div>
      {modalOpen && (
        <ModalEntries
          closeModal={() => setModalOpen(false)}
          value={value}
          setValue={setValue}
          addMoreData={addMoreData}
          addData={addData}
        />
      )}
    </div>
  );
};

export default CardShuffler;
