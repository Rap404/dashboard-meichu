import React, { useState } from "react";
import SelectItem from "../input/SelectItem";
import { assets } from "../../assets/Assets";

const FormDefault = ({ FormData }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const options = [
    { value: "10", label: "10 per page" },
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
    { value: "100", label: "100 per page" },
  ];

  const renderFormInput = (item) => {
    switch (item.type) {
      case "text":
        return (
          <input
            type="text"
            name={item.name}
            id={item.id}
            placeholder={item.placeholder}
            className="mt-1 block w-full rounded-lg bg-abutua border border-abumuda text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren py-2 px-3"
          />
        );

      case "select":
        return (
          <div className="">
            <SelectItem
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder="Select items per page"
            />
          </div>
        );

      case "file":
        return (
          <div className="">
            <img src={assets.logo} alt="" />
          </div>
        );

      case "textArea":
        return (
          <div className="text-white">
            <input type="text" />
          </div>
        );
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {FormData.map((field, index) => (
        <div className="w-full" key={index}>
          <label htmlFor="" className="block text-sm font-medium text-white">
            {field.label}
          </label>
          {renderFormInput(field)}
          {/* {field.type == "select" ? (
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
          )} */}
        </div>
      ))}
    </div>
  );
};

export default FormDefault;
