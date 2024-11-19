import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css"; // Tambahkan ini
import setCanvasPreview from "./setCanvasPreview";

const CROP_PRESET = {
  profile: {
    aspect: 1,
    minDimension: 150,
    width: 150,
    height: 150,
    circular: true,
    label: "Profile Photo",
  },
  cover: {
    aspect: 16 / 9,
    minDimension: 300,
    Width: 1200,
    height: 675,
    circular: false,
    label: "Cover Image",
  },
};

const ImageCropper = ({
  setSelectedImage,
  updateImage,
  closeModal,
  cropPreset = "cover",
}) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [error, setError] = useState("");

  const currentPreset = CROP_PRESET[cropPreset];

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        if (error) setError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (
          naturalWidth < currentPreset.minDimension ||
          naturalHeight < currentPreset.minDimension
        ) {
          setError(
            `Image must be at least ${currentPreset.minDimension}px dimension.`
          );
          return setImgSrc("");
        }
      });
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (currentPreset.minDimension / width) * 100;

    // Perbaiki parameter makeAspectCrop
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      currentPreset.aspect, // Gunakan aspect saja, bukan currentPreset
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {" "}
      {/* Tambahkan wrapper dengan ukuran maksimum */}
      <label htmlFor="image-input" className="block mb-3 w-fit">
        <span className="sr-only">Choose image</span>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-oren hover:file:bg-gray-600"
        />
      </label>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <div className="max-w-full overflow-hidden">
            {" "}
            {/* Tambahkan wrapper untuk ReactCrop */}
            <ReactCrop
              crop={crop}
              onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
              keepSelection
              aspect={currentPreset.aspect}
              minWidth={currentPreset.minDimension}
              circularCrop={currentPreset.circular}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                alt="upload"
                style={{ maxHeight: "70vh", maxWidth: "100%" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          </div>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-oren hover:bg-kuning"
            onClick={() => {
              if (imgRef.current && previewCanvasRef.current && crop) {
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  convertToPixelCrop(
                    crop,
                    imgRef.current.width,
                    imgRef.current.height
                  )
                );
                previewCanvasRef.current.toBlob((blob) => {
                  if (blob) {
                    setSelectedImage(blob);
                  }
                });
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateImage(dataUrl);
                closeModal();
              }
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className="mt-4"
          style={{
            display: "none",
            border: "1px solid black",
            objectFit: "contain",
            width: currentPreset.width,
            height: currentPreset.height,
          }}
        />
      )}
    </div>
  );
};

export default ImageCropper;
