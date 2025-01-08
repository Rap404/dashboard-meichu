import React from "react";
import IconGrayButton from "../buttons/IconGrayButton";
import {
  ArrowLeftEndOnRectangleIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
const WelcomeBox = ({ imageProfile }) => {
  return (
    <div className="w-full bg-secondary border border-abutua rounded-xl py-5 px-10 flex justify-between">
      <div className="flex gap-5">
        <img
          src={imageProfile}
          alt=""
          className="hidden md:block lg:block w-11 h-11 rounded-full"
        />
        <div className="flex flex-col text-white">
          <span className="text-white text-lg">Welcome</span>
          <span className="text-abumuda text-sm">Admin</span>
        </div>
      </div>
      <IconGrayButton
        icon={<MoonIcon />}
        text={"Switch mode"}
        func={() => console.log("aplpawl")}
      />
    </div>
  );
};

export default WelcomeBox;
