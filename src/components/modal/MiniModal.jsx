import { ExclamationCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const MiniModal = ({
  closeModal,
  func,
  text = "You won't be able to revert this!",
  isText = true,
  buttonName = "remove",
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-secondary bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={closeModal}
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="false"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white border-2 dark:border-none dark:bg-black rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-putihtrd dark:bg-abutua px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-center items-center">
              <div className="flex flex-col gap-5 justify-center mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <div className="flex justify-center text-center">
                  <span>
                    <ExclamationCircleIcon className="w-32 h-32 text-red-500 dark:text-red-300" />
                  </span>
                </div>
                <div className="flex justify-center">
                  <span
                    className="text-4xl leading-6 font-medium dark:text-white"
                    id="modal-title"
                  >
                    Are you sure ?
                  </span>
                </div>
                {isText && (
                  <div className="mt-2">
                    <p className="text-lg text-gray-500">{text}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row lg:flex-row justify-center bg-putihtrd dark:bg-abutua px-4 py-5 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-oren text-base font-medium text-white hover:bg-kuning focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={func}
            >
              {buttonName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniModal;
