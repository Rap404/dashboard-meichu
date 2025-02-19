import React, { useEffect, useRef, useState } from "react";
import TextArea from "../input/TextArea";
import UploadImage from "../input/UploadImage";
import UploadImages from "../input/UploadImages";
import MultiSelect from "../input/MultiSelect";
import DateInput from "../input/DateInput";
import CircularImages from "../images/CircularImages";
import MultiPreview from "../input/MultiPreview";

const FormDefault = ({
  formConstant,
  FormData,
  setFormData,
  file,
  availableItems,
  multiSelectValue,
  changeHandler,
  fileHandler,
  onMultiChange,
  onSelectChange,
}) => {
  console.log(availableItems);

  const selectOptions = Array.isArray(availableItems)
    ? availableItems?.map((item) => ({
        id: item?.id,
        name: item?.attributes?.name,
      }))
    : [];

  const handleImageUpload = (img, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: img,
    }));
  };

  const handleBool = (value, fieldName) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleRemoveImage = (fieldName) => {
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[fieldName];
      return newData;
    });
  };

  const handleMultiImageUpload = (img, index, fieldName) => {
    setFormData((prev) => {
      const newImages = [...(prev[fieldName] || [])];
      newImages[index] = img;

      return {
        ...prev,
        [fieldName]: newImages,
      };
    });
  };

  const handleRemoveMultiImage = (index, fieldName) => {
    setFormData((prev) => {
      const newImages = prev[fieldName].filter((_, i) => i !== index);
      return {
        ...prev,
        [fieldName]: newImages,
      };
    });
  };

  const handleAddImage = (fieldName) => {
    setFormData((prev) => {
      const currentImages = prev[fieldName] || [];
      return {
        ...prev,
        [fieldName]: [...currentImages, null],
      };
    });
  };

  const handleMultiSelectChange = (selectedOptions) => {
    onMultiChange(selectedOptions);
  };

  const handleSelectChange = (selectedOptions) => {
    onSelectChange(selectedOptions);
  };

  const renderFormInput = (item) => {
    switch (item.type) {
      case "text":
        return (
          <>
            <input
              type="text"
              name={item.name}
              required={item?.required || false}
              id={item.id}
              disabled={item.disabled ? item.disabled : false}
              value={FormData[item.name] || ""}
              onChange={changeHandler}
              placeholder={item.placeholder}
              className={`mt-1 block w-full rounded-lg border dark:border-abumuda text-hitam dark:text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren py-2 px-3 ${
                item.disabled
                  ? "bg-putihtrd dark:bg-abumuda"
                  : " dark:bg-secondary"
              }`}
            />
          </>
        );

      case "bool":
        const [isActive, setIsActive] = useState(false);
        const buttonRef = useRef(null);

        const handleClickButton = (value) => {
          handleBool(value, item.name);
          setIsActive(true);
        };

        useEffect(() => {
          const handleClickOutside = (e) => {
            if (buttonRef.current && !buttonRef.current.contains(e.target)) {
              setIsActive(false);
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          return () =>
            document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        return (
          <>
            <input
              id={item.id}
              name={item.name}
              value={FormData[item.name]}
              onChange={changeHandler}
              type="text"
              hidden
            />
            <div
              className={`flex w-60 bg-white dark:bg-secondary p-2 text-hitam dark:text-white justify-between mt-2 px-5 items-center rounded-md border ${
                isActive === false
                  ? "border-2 dark:border-abumuda"
                  : "border-kuning"
              }`}
              ref={buttonRef}
            >
              <button
                className={`px-1 text-sm rounded-sm p-2 my-1${
                  FormData[item.name] !== true &&
                  "dark:bg-abutua text-red-600 border border-abumuda"
                }`}
                onClick={() => handleClickButton(false)}
              >
                <span className="px-6">False</span>
              </button>
              <button
                className={`px-1 text-sm rounded-sm p-1 my-1 ${
                  FormData[item.name] === true &&
                  "dark:bg-abutua text-ungu border border-abumuda"
                }`}
                onClick={() => handleClickButton(true)}
              >
                <span className="px-6">True</span>
              </button>
            </div>
          </>
        );

      case "price":
        return (
          <>
            <input
              type="number"
              name={item.name}
              id={item.id}
              required={item?.required || false}
              disabled={item.disabled ? item.disabled : false}
              value={FormData[item.name] || ""}
              onChange={changeHandler}
              placeholder={item.placeholder}
              className={`mt-1 block overflow-scroll w-full rounded-lg border-2 dark:border-abumuda dark:text-gray-300 focus:outline-none focus:border-none focus:ring-1 focus:ring-oren py-2 px-3 ${
                item.disabled ? "bg-abumuda" : "dark:bg-secondary"
              }`}
            />
          </>
        );

      case "multiselect":
        return (
          <div className="">
            <MultiSelect
              value={multiSelectValue}
              onChange={handleMultiSelectChange}
              options={selectOptions}
              label={item.label}
            />
          </div>
        );

      case "itemsPreview":
        return (
          <div className="">
            <MultiPreview items={availableItems} />
          </div>
        );

      case "file":
        return (
          <div className="">
            <UploadImage
              setSelectedImage={(img) => handleImageUpload(img, item.name)}
              image={FormData[item.name]}
              onRemove={() => handleRemoveImage(item.name)}
              cropPreset={item.preset}
            />
          </div>
        );

      case "profile":
        return (
          <div className="flex flex-col p-14 py-28 md:p-24 lg:p-28">
            <CircularImages
              setSelectedProfile={(img) => fileHandler(img)}
              image={file}
            />
          </div>
        );

      case "files":
        return (
          <>
            <div className="static flex flex-col gap-6">
              {FormData[item.name].length === 0 ? (
                <UploadImage
                  setSelectedImage={(img) =>
                    handleMultiImageUpload(img, 0, item.name)
                  }
                  showAddButton
                  cropPreset={item.preset}
                  onAdd={() => handleAddImage(item.name)}
                />
              ) : (
                <>
                  {FormData[item.name]?.map((image, index) => (
                    <UploadImages
                      key={index}
                      index={index}
                      image={image}
                      setSelectedImage={(img) => {
                        handleMultiImageUpload(img, index, item.name);
                      }}
                      onRemove={() => handleRemoveMultiImage(index, item.name)}
                      isLast={index === FormData[item.name].length - 1}
                      onAdd={() => handleAddImage(item.name)}
                      cropPreset={item.preset}
                    />
                  ))}
                </>
              )}
            </div>
          </>
        );

      case "textArea":
        return (
          <>
            <TextArea
              id={item.id}
              label={item.label}
              name={item.name}
              value={FormData[item.name]}
              onChange={changeHandler}
              placeholder={item.placeholder}
              maxLength={600}
              required={item?.required || false}
            />
          </>
        );

      case "date":
        return (
          <div className="">
            <DateInput
              name={item.name}
              value={FormData[item.name]}
              onChange={changeHandler}
              isRequired={item.required}
            />
          </div>
        );

      default:
        return null;
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      {formConstant.map((field, index) => (
        <div className="w-full" key={index}>
          {field.type === "profile" ? (
            ""
          ) : (
            <label
              htmlFor=""
              className="block text-sm font-medium text-hitam dark:text-white"
            >
              {field.label}
            </label>
          )}
          {renderFormInput(field)}
        </div>
      ))}
    </div>
  );
};

export default FormDefault;
