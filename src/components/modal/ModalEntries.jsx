import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import { oneHandleChange } from "../../lib/FormHandler";
import { AnimatePresence, motion } from "motion/react";

const ModalEntries = ({
  closeModal,
  func,
  func2,
  value,
  setValue,
  addMoreData,
  addData,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="false"
        >
          &#8203;
        </span>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring" },
          }}
          className="inline-block bg-white border-2 dark:border-none dark:bg-black rounded-lg text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          {/* <div className="absolute -inset-0.5 ring-offset-1 bg-gradient-to-r from-oren to-ijokepong rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div> */}
          <div className="relative rounded-lg bg-putihtrd dark:bg-abutua">
            <form onSubmit={addMoreData}>
              <div className=" px-4 py-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-center items-center">
                  <div className="flex flex-col gap-5 justify-center mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex justify-center">
                      <span
                        className="text-4xl leading-6 font-medium dark:text-white py-5"
                        id="modal-title"
                      >
                        Add Data
                      </span>
                    </div>
                    <input
                      type="text"
                      className="border text-hitam border-secondary rounded-md w-full px-3 py-5 text-center text-sm"
                      placeholder="Input Data"
                      value={value}
                      onChange={(e) => oneHandleChange(e, setValue)}
                    />
                    <div className="dark:text-white">
                      <p className="text-xs px-5">
                        <span className="text-red-600">*</span> Click 'Add Data'
                        to enter a name, and the data will appear on the Spinner
                        page. If you're done, click 'Done'.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row lg:flex-row justify-center px-4 py-5 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-xl border border-transparent shadow-sm px-10 py-3 bg-oren text-base font-medium text-white hover:bg-kuning focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={addData}
                >
                  Done
                </button>
                <button
                  type="submit"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={addMoreData}
                >
                  Add Data
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ModalEntries;
