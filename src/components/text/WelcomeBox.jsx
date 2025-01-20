import React from "react";
import IconGrayButton from "../buttons/IconGrayButton";
import { UserIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
const WelcomeBox = ({ imageProfile }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white dark:bg-secondary border border-2-abutua dark:border-abutua rounded-xl py-5 px-10 flex justify-between">
      <div className="flex gap-5">
        <img
          src={imageProfile}
          alt=""
          className="hidden md:block lg:block w-11 h-11 rounded-full"
        />
        <div className="flex flex-col text-white">
          <span className="text-hitam dark:text-white text-lg">Welcome</span>
          <span className="text-abumuda text-sm">Admin</span>
        </div>
      </div>
      <IconGrayButton
        icon={<UserIcon />}
        text={"Edit profile"}
        func={() => navigate("/profile")}
      />
    </div>
  );
};

export default WelcomeBox;
