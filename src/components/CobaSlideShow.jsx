import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const slides = [
  { color: "bg-blue-500", text: "Slide 1" },
  { color: "bg-green-500", text: "Slide 2" },
  { color: "bg-red-500", text: "Slide 3" },
  { color: "bg-yellow-500", text: "Slide 4" },
];

const Slideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isSpinning) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * slides.length);
        setCurrentIndex(randomIndex);
      }, 100); // Adjust interval time as needed
    }

    return () => clearInterval(intervalId);
  }, [isSpinning]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 3000); // Stop spinning after 3 seconds
  };

  const getSlideIndex = (index) => {
    const newIndex = (index + slides.length) % slides.length;
    return newIndex;
  };

  return (
    <div className="">
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden flex items-center justify-center">
        {/* Main Slides */}
        <div className="flex w-full items-center justify-center">
          {/* Previous Slide */}
          <motion.div
            className={`relative w-1/2 h-64 rounded-lg shadow-lg ${
              slides[getSlideIndex(currentIndex - 1)].color
            } flex items-center justify-center text-white text-lg`}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 0.8, opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            {slides[getSlideIndex(currentIndex - 1)].text}
          </motion.div>

          {/* Current Slide */}
          <motion.div
            className={`absolute z-10 w-1/2 h-64 rounded-lg shadow-lg ${slides[currentIndex].color} flex items-center justify-center text-white text-2xl font-bold`}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {slides[currentIndex].text}
          </motion.div>

          {/* Next Slide */}
          <motion.div
            className={`relative w-1/2 h-64 rounded-lg shadow-lg ${
              slides[getSlideIndex(currentIndex + 1)].color
            } flex items-center justify-center text-white text-lg`}
            initial={{ scale: 0.8, opacity: 0.6 }}
            animate={{ scale: 0.8, opacity: 0.6 }}
            transition={{ duration: 0.5 }}
          >
            {slides[getSlideIndex(currentIndex + 1)].text}
          </motion.div>
        </div>

        {/* <button
          onClick={handlePrev}
          className="absolute left-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
        >
          &#8592;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
        >
          &#8594;
        </button> */}
      </div>
      <button onClick={handleSpin} className="bg-ijo">
        Spin
      </button>
    </div>
  );
};

export default Slideshow;
