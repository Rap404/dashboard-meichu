import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MiniModal from "./modal/MiniModal";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useAuth } from "../lib/AuthContext";
import { successNotif } from "./text/Notification";
import DeleteButton from "./buttons/DeleteButton";

const Slideshow = ({ slides, setLoading, setError, removeNewImage, fetch }) => {
  const { token } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

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

  const getSlideIndex = (index) => {
    const newIndex = (index + slides.length) % slides.length;
    return newIndex;
  };

  const handleReturnImage = (slide) => {
    if (slide instanceof File || slide instanceof Blob) {
      const objectUrl = URL.createObjectURL(slide);
      return objectUrl;
    } else if (slide?.attributes?.image?.data?.attributes?.url) {
      return slide.attributes.image.data.attributes.url;
    }

    return null;
  };

  const removeImage = async () => {
    try {
      setLoading(true);
      const currentUUID = slides[currentIndex]?.attributes?.uuid;
      if (currentUUID) {
        await axios.delete(`${baseUrl}/banner-images/${currentUUID}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await fetch();
      } else {
        removeNewImage(currentIndex);
        setCurrentIndex(getSlideIndex(currentIndex - 1));
      }
      successNotif("sucessfully deleted image");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setModalOpen(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full mx-auto overflow-hidden flex items-center justify-center">
        {/* Main Slides */}
        {slides && (
          <div className="flex w-full items-center justify-center h-full">
            {/* Previous Slide */}
            <motion.div
              className={`hidden md:flex lg:flex rounded-lg shadow-lg items-center justify-center text-white text-lg`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 0.8, opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="max-h-40 w-full h-full"
                src={handleReturnImage(slides[getSlideIndex(currentIndex - 2)])}
                alt=""
              />
            </motion.div>

            <motion.div
              className={`hidden md:flex lg:flex rounded-lg shadow-lg items-center justify-center text-white text-lg`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 0.8, opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="max-h-44 w-full h-full"
                src={handleReturnImage(slides[getSlideIndex(currentIndex - 1)])}
                alt=""
              />
            </motion.div>

            {/* Current Slide */}
            <motion.div
              className={`max-h-64 z-10 rounded-lg shadow-lg items-center justify-center`}
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="">
                <div className="absolute z-10">
                  <DeleteButton
                    func={() => setModalOpen(true)}
                    name={"Delete"}
                  />
                </div>
                <img
                  className="relative max-h-64 w-full h-full"
                  src={handleReturnImage(slides[currentIndex])}
                  alt=""
                />
              </div>
            </motion.div>

            {/* Next Slide */}
            <motion.div
              className={`hidden md:flex lg:flex rounded-lg shadow-lg items-center justify-center text-white text-lg`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 0.8, opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="max-h-44 w-full h-full"
                src={handleReturnImage(slides[getSlideIndex(currentIndex + 1)])}
                alt=""
              />
            </motion.div>
            <motion.div
              className={`hidden md:flex lg:flex rounded-lg shadow-lg items-center justify-center text-white text-lg`}
              initial={{ scale: 0.8, opacity: 0.6 }}
              animate={{ scale: 0.8, opacity: 0.6 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="max-h-40 w-full h-full"
                src={handleReturnImage(slides[getSlideIndex(currentIndex + 2)])}
                alt=""
              />
            </motion.div>
          </div>
        )}

        <div className="absolute z-10 w-full xl:px-20">
          <div className="flex w-full justify-between">
            <button
              onClick={handlePrev}
              className="left-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
            >
              &#8592;
            </button>
            {/* <DeleteButton name={"Delete"} func={setModalOpen(true)} /> */}
            <button
              onClick={handleNext}
              className="right-4 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600 focus:outline-none"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
      {modalOpen && (
        <MiniModal closeModal={() => setModalOpen(false)} func={removeImage} />
      )}
    </div>
  );
};

export default Slideshow;
