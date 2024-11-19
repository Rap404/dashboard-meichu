import { CloudDownload } from "lucide-react";
import React, { useRef, useState } from "react";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";

const UploadImage = ({
  setSelectedImage,
  image,
  onRemove,
  showAddButton = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);
  // const coverUrl = useRef(null);
  // const updateCover = (imgSrc) => {
  //   coverUrl.current = imgSrc;
  // };
  // const noImage = (componentTrue, componentFalse) => {
  //   if (coverUrl.current === null) {
  //     return componentTrue;
  //   } else {
  //     return componentFalse;
  //   }
  // };
  // console.log(coverUrl.current);

  const handleImageUpload = (imgBlob) => {
    if (imgBlob) {
      setFileInfo({
        name: "uploaded-img.jpg",
        size: (imgBlob.size / 1024).toFixed(2) + "KB",
      });
    }
    setSelectedImage(imgBlob);
  };

  return (
    <div
      className={`flex flex-col mt-1 gap-1 items-center justify-end border border-abutua rounded-3xl hover:bg-secondary ${
        !image ? "py-12" : "py-0 transition-all duration-1000"
      }`}
    >
      {image && (
        <div className="w-full bg-oren bg-opacity-50 text-white p-4 rounded-t-3xl flex items-center justify-between transition-all duration-200">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-medium">{fileInfo?.name || "Image"}</span>
              <span className="text-kuning text-sm">
                {fileInfo?.size || ""}
              </span>
            </div>
            <span>Upload Completed</span>
          </div>
        </div>
      )}

      <div className="relative w-full px-10 py-4">
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt=""
            className="w-full h-auto rounded-lg"
          />
        )}
        {/* <img src={coverUrl.current} alt="" /> */}
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
        <div className="absolute flex flex-row gap-3">
          <Button func={onRemove} name={"Hapus"} />
          <Button func={() => setModalOpen(true)} name={"Edit"} />
          {showAddButton && (
            <Button func={() => setSelectedImage(null)} name={"Tambah"} />
          )}
        </div>
      )}

      {modalOpen && (
        <Modal
          setSelectedImage={handleImageUpload}
          // updatedImage={updateCover}
          closeModal={() => setModalOpen(false)}
          cropPreset={"cover"}
        />
      )}
    </div>
  );
};

export default UploadImage;
