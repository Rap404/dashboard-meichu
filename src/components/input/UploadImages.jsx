import React, { useRef, useState } from "react";
import Modal from "../modal/Modal";
import Button from "../buttons/Button";
import { CloudDownload } from "lucide-react";

const UploadImages = ({
  setSelectedImage,
  image,
  index,
  onRemove,
  isLast,
  onAdd,
  cropPreset,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  // const [fileInfo, setFileInfo] = useState(null);

  // const handleImageUpload = (imgBlob) => {
  //   if (imgBlob) {
  //     setFileInfo({
  //       name: `image-${index + 1}.jpg`,
  //       size: (imgBlob.size / 1024).toFixed(2) + " KB",
  //     });
  //     setSelectedImage(imgBlob);
  //   }
  // };
  return (
    <div
      className={`flex flex-col mt-1 gap-1 items-center justify-end border border-abutua rounded-3xl hover:bg-secondary ${
        !image ? "py-12" : "py-0 transition-all duration-1000"
      }`}
    >
      {image && (
        <div className="w-full bg-gradient-to-b from-ijo to-transparent text-white p-4 rounded-t-3xl items-center justify-between transition-all duration-200">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium">{`Image ${index + 1}`}</span>
            </div>
            <span>Upload Completed</span>
          </div>
        </div>
      )}

      <div className="flex justify-center w-full px-10 pb-7">
        {image && (
          <img
            src={URL.createObjectURL(image)}
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
            className="w-full text-abumuda opacity-50 items-center"
            strokeWidth={1}
            size={70}
          />
          <p className="text-abumuda text-center">
            Upload product image {index + 1} upload
          </p>
        </button>
      ) : (
        <div className="justify-end flex flex-row gap-3 absolute py-5">
          <Button func={onRemove} name={"Hapus"} />
          <Button func={() => setModalOpen(true)} name={"Edit"} />
          {isLast && <Button func={onAdd} name={"Tambah"} />}
        </div>
      )}
      {modalOpen && (
        <Modal
          setSelectedImage={setSelectedImage}
          closeModal={() => setModalOpen(false)}
          cropPreset={cropPreset}
        />
      )}
    </div>
  );
};

export default UploadImages;
