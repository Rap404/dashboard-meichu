import React, { useState } from "react";
import SelectItem from "../input/SelectItem";
import { assets } from "../../assets/Assets";
import TextArea from "../input/TextArea";
import UploadImage from "../input/UploadImage";
import UploadImages from "../input/UploadImages";
import MultiSelect from "../input/MultiSelect";
import DateInput from "../input/DateInput";
import CircularImages from "../images/CircularImages";
import { baseUrl } from "../../Constant";

const FormDefault = ({
  FormData,
  data,
  file,
  changeHandler,
  fileHandler,
  filesHandler,
  itemsSelect,
}) => {
  // Add these helper functions to FormDefault component
  const [selectedValue, setSelectedValue] = useState([]);
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  // console.log(selectedItems);

  const transportasisOptions = [
    { id: 1, name: "Innova Merah" },
    { id: 2, name: "Kawasaki Ninja" },
    { id: 3, name: "Honda Pilot" },
    { id: 4, name: "Fortuner Hitam" },
    { id: 5, name: "Avanza,Xenia" },
    { id: 6, name: "Toyota Camry" },
    { id: 7, name: "Nissan GTR" },
    // ... more options
  ];

  const options = [
    { value: "10", label: "10 per page" },
    { value: "20", label: "20 per page" },
    { value: "50", label: "50 per page" },
    { value: "100", label: "100 per page" },
  ];

  const handleImageUpload = (img, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: img,
    }));
  };

  const handleRemoveImage = (fieldName) => {
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[fieldName];
      return newData;
    });
  };

  const handleMultiImageUpload = (img, index) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = img;
      return newImages;
    });
  };

  const handleRemoveMultiImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddImage = () => {
    setImages((prev) => [...prev, null]);
  };

  const renderFormInput = (item) => {
    switch (item.type) {
      case "text":
        return (
          <>
            <label
              htmlFor=""
              className={`block text-sm font-medium text-white`}
            >
              {item.label}
            </label>
            <input
              type="text"
              name={item.name}
              id={item.id}
              disabled={item.disabled ? item.disabled : false}
              value={data[item.name] || ""}
              onChange={changeHandler}
              placeholder={item.placeholder}
              className={`mt-1 block w-full rounded-lg border border-abumuda text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren py-2 px-3 ${
                item.disabled ? "bg-abumuda" : "bg-secondary"
              }`}
            />
          </>
        );

      case "select":
        return (
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-white">
              {item.label}
            </label>
            <SelectItem
              options={options}
              value={selectedValue}
              onChange={setSelectedValue}
              placeholder={item.placeholder}
            />
          </div>
        );

      case "multiselect":
        return (
          <div className="">
            <MultiSelect
              value={selectedItems}
              onChange={setSelectedItems}
              options={transportasisOptions}
            />
          </div>
        );

      case "file":
        return (
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-white">
              {item.label}
            </label>
            <UploadImage
              setSelectedImage={(img) => {
                handleImageUpload(img, item.name);
              }}
              image={formData[item.name]}
              onRemove={() => handleRemoveImage(item.name)}
              cropPreset={item.preset}
            />
          </div>
        );

      case "profile":
        return (
          <div className="flex flex-col p-28">
            <CircularImages
              setSelectedProfile={(img) => fileHandler(img)}
              image={file}
            />
          </div>
        );

      case "files":
        return (
          <>
            <label htmlFor="" className="block text-sm font-medium text-white">
              {item.label}
            </label>
            <div className="flex flex-col gap-6">
              {images.map((image, index) => (
                <UploadImages
                  key={index}
                  index={index}
                  image={image}
                  setSelectedImage={(img) => handleMultiImageUpload(img, index)}
                  onRemove={() => handleRemoveMultiImage(index)}
                  isLast={index === images.length - 1}
                  onAdd={() => handleAddImage()}
                />
              ))}
              {images.length === 0 && (
                <UploadImage
                  setSelectedImage={(img) => handleMultiImageUpload(img, 0)}
                  showAddButton
                />
              )}
            </div>
          </>
        );

      case "textArea":
        return (
          <>
            <label htmlFor="" className="block text-sm font-medium text-white">
              {item.label}
            </label>
            <TextArea
              label={item.label}
              value={""}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={item.placeholder}
              maxLength={600}
            />
          </>
        );

      case "date":
        return (
          <div className="">
            <label htmlFor="" className="block text-sm font-medium text-white">
              {item.label}
            </label>
            <DateInput />
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {FormData.map((field, index) => (
        <div className="w-full" key={index}>
          {renderFormInput(field)}
        </div>
      ))}
    </div>
  );
};

export default FormDefault;
