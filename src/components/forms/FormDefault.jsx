import React, { useState } from "react";
import SelectItem from "../input/SelectItem";

const FormDefault = ({ FormData }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { value: "10", label: "10 per page" },
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
    { value: "100", label: "100 per page" },
  ];
  return (
    <div className="flex flex-row items-center rounded-md shadow-sm gap-6 pt-10">
      {FormData.map((field, index) => (
        <div className="w-full" key={index}>
          {field.type == "select" ? (
            <div className="">
              <label htmlFor="" className="text-white">
                {field.label}
              </label>
              <div className="">
                <SelectItem
                  options={options}
                  value={selectedValue}
                  onChange={setSelectedValue}
                  placeholder="Select items per page"
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col" key={index}>
              <label htmlFor="" className="text-white">
                {field.label}
              </label>
              <input
                type=""
                name={field.name}
                // value={""}
                // onChange={""}
                placeholder={field.placeholder}
                className="bg-gray-700 h-12 rounded-md text-white border border-secondary focus:outline-none focus:border-kuning focus:ring-kuning p-2"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormDefault;
