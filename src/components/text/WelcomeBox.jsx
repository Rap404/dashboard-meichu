import React from "react";
import IconGrayButton from "../buttons/IconGrayButton";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { assets } from "../../assets/Assets";
import { useNavigate } from "react-router-dom";
import { errorNotif } from "./Notification";
import { useAuth } from "../../lib/AuthContext";

const WelcomeBox = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
      errorNotif(error.message);
    }
  };

  return (
    <div className="w-full bg-secondary border border-abutua rounded-xl py-5 px-10 flex justify-between">
      <div className="flex gap-5">
        <img
          src={assets.photo_profile}
          alt=""
          className="hidden md:block lg:block w-full h-full"
        />
        <div className="flex flex-col text-white">
          <span className="text-white text-lg">Welcome</span>
          <span className="text-abumuda text-sm">Admin</span>
        </div>
      </div>
      <IconGrayButton
        icon={<ArrowLeftEndOnRectangleIcon />}
        text={"Sign Out"}
        func={handleLogout}
      />
    </div>
  );
};

export default WelcomeBox;
