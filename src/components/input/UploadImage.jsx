import { CloudDownload } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";
import { mediaUrl } from "../../Constant";

const UploadImage = ({
  setSelectedImage,
  image,
  onRemove,
  showAddButton = false,
  onAdd,
  cropPreset = "cover",
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = (imgBlob) => {
    if (imgBlob) {
      setFileInfo({
        name: "uploaded-img.jpg",
        size: (imgBlob.size / 1024).toFixed(2) + "KB",
      });
    }
    setSelectedImage(imgBlob);
  };

  const handleReturnImage = () => {
    setSelectedImg(null);
    if (image instanceof File || image instanceof Blob) {
      const objectUrl = URL.createObjectURL(image);
      setSelectedImg(objectUrl);
    } else if (typeof image === "string") {
      setSelectedImg(image);
    } else {
      setSelectedImg(null);
    }
  };

  useEffect(() => {
    if (image) {
      handleReturnImage();
    }
  }, [image]);

  return (
    <div
      className={`flex flex-col mt-1 gap-1 items-center justify-end border-2 dark:border-abutua rounded-3xl hover:bg-gray-200 dark:hover:bg-secondary ${
        !image ? "py-12" : "py-0 transition-all duration-1000 "
      }`}
    >
      {image && (
        <div className="w-full bg-gradient-to-b from-ijo to-transparent text-white p-4 rounded-t-3xl items-center justify-between transition-all duration-200">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium">{`Image`}</span>
            </div>
            <span>Upload Completed</span>
          </div>
        </div>
      )}

      <div className="flex justify-center w-full px-10 pb-7">
        {image && (
          <img
            src={selectedImg}
            alt=""
            className="max-w-64 h-auto rounded-lg"
          />
        )}
      </div>

      {!image ? (
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="w-full flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <CloudDownload
            className="text-abumuda opacity-50"
            strokeWidth={1}
            size={70}
          />
          <p className=" text-abumuda text-center">Upload product image</p>
        </button>
      ) : (
        <div className="flex flex-row gap-3 py-5">
          <Button func={onRemove} name={"Delete"} />
          <Button func={() => setModalOpen(true)} name={"Edit"} />
          {showAddButton && <Button func={() => onAdd} name={"Tambah"} />}
        </div>
      )}

      {modalOpen && (
        <Modal
          setSelectedImage={handleImageUpload}
          closeModal={() => setModalOpen(false)}
          cropPreset={cropPreset}
        />
      )}
    </div>
  );
};

export default UploadImage;
