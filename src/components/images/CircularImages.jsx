import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { assets } from "../../assets/Assets";
import Modal from "../modal/Modal";
import { SquarePen } from "lucide-react";

const CircularImages = ({ setSelectedProfile, image }) => {
  const [modalOpen, setModalOpen] = useState();
  const [fileInfo, setFileInfo] = useState(null);
  const location = useLocation();
  const [editProfile, setEditProfile] = useState(false);

  const handleProfileUpload = (imgBlob) => {
    if (imgBlob) {
      setFileInfo({
        name: "profile-img.jpg",
        size: (imgBlob.size / 1024).toFixed(2) + "KB",
      });
    }
    setSelectedProfile(imgBlob);
  };

  const handleEditProfile = () => {
    if (location.pathname === "/profile") {
      setEditProfile(true);
    }
  };

  useEffect(() => {
    handleEditProfile();
  });

  return (
    <div className="relative">
      <div className="flex flex-col items-center justify-center">
        <div className="absolute -bottom-12">
          {editProfile ? (
            <div className="relative">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-[200px] h-[200px] rounded-full md:rounded-full lg:rounded-full border-2 border-gray-400"
                />
              ) : (
                <img
                  src={assets.photo_profile}
                  className="w-[200px] h-[200px] rounded-full md:rounded-full lg:rounded-full border-2 border-gray-400"
                />
              )}
              <button
                className="absolute bottom-0 right-0 rounded-full border-2 border-hitam p-2 bg-white hover:bg-oren"
                onClick={() => setModalOpen(true)}
              >
                <SquarePen className="text-hijau" size={20} strokeWidth={2.1} />
              </button>
              {modalOpen && (
                <Modal
                  setSelectedImage={handleProfileUpload}
                  // updateImage={updateAvatar}
                  closeModal={() => setModalOpen(false)}
                  cropPreset={"profile"}
                />
              )}
            </div>
          ) : (
            <img
              src={assets.photo_profile}
              //  className="size-36"
              className="w-[150px] h-[150px] rounded-full border-2 border-gray-400"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CircularImages;
