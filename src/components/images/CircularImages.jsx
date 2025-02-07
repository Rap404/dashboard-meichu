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
        {editProfile ? (
          <div className="absolute -bottom-12">
            <div className="relative">
              {image ? (
                <img
                  src={image}
                  className="w-48 h-auto block rounded-full md:rounded-full lg:rounded-full border-2 border-gray-400"
                />
              ) : (
                <img
                  src={assets.photo_profile}
                  className="w-[200px] h-[200px] rounded-full md:rounded-full lg:rounded-full border-2 border-gray-400"
                />
              )}
              <button
                className="absolute bottom-0 right-0 rounded-full border-2 hover:border-oren hover:text-oren text-hitam dark:hover:border-oren dark:border-hitam p-2 bg-white"
                onClick={() => setModalOpen(true)}
              >
                <SquarePen className="" size={20} strokeWidth={2.1} />
              </button>
              {modalOpen && (
                <Modal
                  setSelectedImage={handleProfileUpload}
                  closeModal={() => setModalOpen(false)}
                  cropPreset={"profile"}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="text-white">tes</div>
          // <img
          //   src={assets.photo_profile}
          //   className="w-20 h-20 rounded-full border-2 border-gray-400"
          // /> 
        )}
      </div>
    </div>
  );
};

export default CircularImages;
