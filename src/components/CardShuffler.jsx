import React, { State, useEffect, useState } from "react";
import { oneHandleChange } from "../lib/FormHandler";
import SubmitButton from "./buttons/SubmitButton";
import { motion } from "framer-motion";
import CheckBox from "./input/CheckBox";
import { FaFontAwesome, FaSync } from "react-icons/fa";
import { ArrowsPointingInIcon, PlusIcon } from "@heroicons/react/24/solid";
import {
  ArrowsPointingOutIcon,
  ArrowTopRightOnSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import ModalEntries from "./modal/ModalEntries";
import { errorNotif } from "./text/Notification";
import RadioButton from "./input/RadioButton";

const CardShuffler = () => {
  const [items, setItems] = useState([]);
  const [isFull, setIsFull] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState();
  const [isSpinning, setIsSpinning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    let intervalId;

    if (isSpinning) {
      intervalId = setInterval(() => {
        setDirection((prevDirection) => {
          if (prevDirection === 0) return 1;
          if (prevDirection === 1) return -1;
          return 0;
        });
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 300);
    }

    // if (isSpinning) {
    //   intervalId = setInterval(() => {
    //     const randomIndex = Math.floor(Math.random() * items.length);
    //     setCurrentIndex(randomIndex);
    //   }, 100);
    // }

    return () => clearInterval(intervalId);
  }, [isSpinning, items.length]);

  const handleSpin = () => {
    if (items.length >= 3) {
      setIsSpinning(true);
      setTimeout(() => {
        setIsSpinning(false);
      }, 4000); // Stop spinning after 3 seconds
    } else {
      errorNotif("Please add at least 3 data to spin!");
    }
  };

  const getSlideIndex = (index) => {
    const newIndex = (index + items.length) % items.length;
    return newIndex;
  };

  const clearAll = () => {
    setItems([]);
  };

  const handleSelectItems = (id) => {
    const updateSelection = selectedItems.includes(id)
      ? selectedItems.filter((selectedItem) => selectedItem !== id)
      : [...selectedItems, id];

    setSelectedItems(updateSelection);
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

  const deleteSelectedItems = () => {
    const updatedItems = items.filter(
      (_, index) => !selectedItems.includes(index)
    );

    // Reset selected items
    setItems(updatedItems);
    setSelectedItems([]);
  };

  const cardVariants = {
    center: { x: 0, scale: 1, zIndex: 10, opacity: 1 },
    left: { x: "-10%", scale: 0.8, zIndex: 0, opacity: 0.6 },
    leftAnimate: { x: "120%", scale: 0.8, zIndex: 1, opacity: 1 },
    right: { x: "10%", scale: 0.8, zIndex: 0, opacity: 0.6 },
    rightAnimate: { x: "-120%", scale: 0.8, zIndex: 0, opacity: 1 },
  };

  return (
    <div
      className={`${
        isFull && "fixed inset-0 w-screen h-screen overflow-y-auto"
      }`}
    >
      <div
        className={` w-full flex flex-col items-center justify-center bg-white dark:bg-hitam gap-10 py-10 lg:px-20 overflow-auto`}
      >
        <div className="w-full flex justify-end">
          <button
            onClick={() => setIsFull((prev) => !prev)}
            className="w-5 h-5"
          >
            {isFull ? <ArrowsPointingInIcon /> : <ArrowsPointingOutIcon />}
          </button>
        </div>
        <p className="text-3xl font-bold dark:text-white">
          {isSpinning
            ? "Hold on! We're still choosing the winner"
            : "Add Data to Start the Spin!"}
        </p>

        <div className="w-full">
          <div className="relative max-w-4xl mx-auto overflow-hidden flex items-center justify-center">
            <div className="flex w-full items-center justify-center gap-20">
              {/* Previouse card */}
              <motion.div
                className={`${
                  !isSpinning ? "hidden md:flex lg:flex" : "flex"
                }  relative w-1/2 h-64 rounded-lg shadow-lg bg-white dark:bg-secondary border border-orengelap items-center justify-center dark:text-white text-lg`}
                variants={cardVariants}
                initial="left"
                animate={
                  isSpinning
                    ? direction > 0
                      ? "center"
                      : "leftAnimate"
                    : "left"
                }
                transition={{ duration: 0.3 }}
              >
                {items[getSlideIndex(currentIndex - 1)] || "No Entries"}
              </motion.div>
              {/* Current card */}
              <motion.div
                className="absolute w-1/2 h-64 z-10 rounded-lg shadow-lg dark:bg-secondary border border-orengelap flex items-center justify-center text-white text-2xl font-bold"
                variants={cardVariants}
                initial="center"
                animate={
                  isSpinning ? (direction > 0 ? "left" : "center") : "center"
                }
                transition={{ duration: 0.3 }}
              >
                {!isSpinning && (
                  <div className="absolute -inset-0 ring-offset-1 bg-gradient-to-r from-orengelap to-ijokepong rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                )}
                <div className="relative w-full h-full text-hitam dark:text-white bg-white dark:bg-secondary rounded-lg leading-none flex items-center justify-center space-x-6">
                  <p>{items[getSlideIndex(currentIndex)] || "No Entries"}</p>
                </div>
              </motion.div>
              {/* Next card */}
              <motion.div
                className={`relative w-1/2 h-64 rounded-lg shadow-lg bg-white border ${
                  isSpinning ? "border-orengelap" : "border-ijokepong"
                }  dark:bg-secondary flex items-center justify-center dark:text-white text-lg `}
                variants={cardVariants}
                initial="right"
                animate={
                  isSpinning
                    ? direction > 0
                      ? "center"
                      : "rightAnimate"
                    : "right"
                }
                transition={{ duration: 0.3 }}
              >
                {items[getSlideIndex(currentIndex + 1)] || "No Entries"}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between">
          <div className="flex flex-col">
            <button
              className={`flex text-red-500 pe-10 ${
                selectedItems.length === 0 && "mt-4"
              }`}
              onClick={clearAll}
            >
              <span className="">Clear All</span>
            </button>
            {selectedItems.length > 0 && (
              <button
                className="flex text-red-500 gap-1"
                onClick={deleteSelectedItems}
              >
                <span className="">Delete Items</span>
                <span className="mt-1">
                  <TrashIcon className="h-4 w-4" />
                </span>
              </button>
            )}
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
        <div className="w-full lg:px-20 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-9 items-center">
          {items.map((name, index) => (
            <div
              key={index}
              className="w-full flex flex-row dark:bg-secondary dark:text-white items-center text-center gap-2 px-2 lg:px-5 py-5 rounded-lg border-abumuda border-r-2 border-b-2 overflow-hidden"
            >
              <RadioButton
                checked={selectedItems.includes(index)}
                onChange={() => handleSelectItems(index)}
              />
              <div className="text-sm md:text-2xl lg:text-2xl">{name}</div>
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
    </div>
  );
};

export default CardShuffler;
