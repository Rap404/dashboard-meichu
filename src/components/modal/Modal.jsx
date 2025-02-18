import React from "react";
import ImageCropper from "../images/ImageCropper";

const Modal = ({ setSelectedImage, closeModal, cropPreset }) => {
  return (
    <div
      className="relative z-20"
      aria-labelledby="crop"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0  bg-opacity-75 transition-all backdrop-blur-sm"></div>
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center px-2 py-12 text-center">
          <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-putihtrd border-2 dark:border-abutua dark:bg-abutua text-slate-100 text-left shadow-xl transition-all">
            <div className="px-5 py-4">
              <button
                type="button"
                className="rounded-md p-1 inline-flex items-center justify-center text-abumuda dark:text-gray-400 hover:text-oren dark:hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                onClick={closeModal}
              >
                <span className="sr-only">Close menu</span>
                Close
              </button>
              <ImageCropper
                setSelectedImage={setSelectedImage}
                closeModal={closeModal}
                cropPreset={cropPreset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
