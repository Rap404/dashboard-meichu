import React from "react";
import { useNavigate } from "react-router-dom";

const MultiPreview = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full relative">
      {/* Selected items */}
      <div className="mt-2 space-y-2">
        {items?.data?.length < 1 && (
          <span className="text-xl dark:text-putihfrt">No Data</span>
        )}
        {items?.data?.map((item, index) => (
          <button
            key={item.id}
            className="flex items-center justify-start w-full bg-gray-200 dark:bg-abumuda px-4 py-2 rounded-md hover:bg-abumuda dark:hover:bg-abutua"
            onClick={() => navigate(`/requests/detail/${item.attributes.uuid}`)}
          >
            <div className="flex items-center gap-2">
              <div className="text-kuning">{index + 1} . </div>
              <span className="text-kuning">{item?.attributes?.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MultiPreview;
