import { TrashIcon } from "@heroicons/react/24/outline";
import React from "react";

const DeleteButton = ({ func, name }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={func}
        className="group relative w-full text-red-600 hover:text-red-500 p-1 text-sm"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteButton;
