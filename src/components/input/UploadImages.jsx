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
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  const handleImageUpload = (imgBlob) => {
    if (imgBlob) {
      setFileInfo({
        name: `image-${index + 1}.jpg`,
        size: (imgBlob.size / 1024).toFixed(2) + " KB",
      });
      setSelectedImage(imgBlob);
    }
  };
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
  return (
    <div
      className={`flex flex-col mt-1 gap-1 items-center justify-end border border-abutua rounded-3xl hover:bg-secondary ${
        !image ? "py-12" : "py-0 transition-all duration-1000"
      }`}
    >
      {image && (
        <div className="w-full absolute bg-gradient-to-b from-ijo to-transparent text-white p-4 rounded-t-3xl items-center justify-between transition-all duration-200">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium">{`Image ${index + 1}`}</span>
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

      {/* {image && (
        
        <img
          src={URL.createObjectURL(image)}
          alt={`Upload ${index + 1}`}
          className="w-full h-auto rounded-lg px-6"
        />
      )} */}

      {/* <div className="px-10">
        <img src={coverUrl.current} alt="" />
      </div> */}

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
            Upload product image {index + 1}
          </p>
        </button>
      ) : (
        <div className="justify-end flex flex-row gap-3 absolute py-2">
          <Button func={onRemove} name={"Hapus"} />
          <Button func={() => setModalOpen(true)} name={"Edit"} />
          {isLast && <Button func={onAdd} name={"Tambah"} />}
        </div>
      )}
      {modalOpen && (
        <Modal
          setSelectedImage={setSelectedImage}
          // updatedImage={updateCover}
          closeModal={() => setModalOpen(false)}
          cropPreset={"cover"}
        />
      )}
    </div>
  );
};

export default UploadImages;
