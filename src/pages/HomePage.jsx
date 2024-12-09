import React from "react";
import FormDefault from "../components/forms/FormDefault";
import { formCategories, mediaUrl } from "../Constant";
import RegularButton from "../components/buttons/RegularButton";
import Button from "../components/buttons/Button";
import { assets } from "../assets/Assets";
import IconGrayButton from "../components/buttons/IconGrayButton";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import NotificationBox from "../components/text/NotificationBox";
import WelcomeBox from "../components/text/WelcomeBox";
import RollingMachine from "../components/RollingMachine";
import SpinMachine from "../components/SpinMachine";

const HomePage = ({ profile }) => {
  const imageProfile = mediaUrl + profile?.profilePicture?.url;
  return (
    <div className="justify-center h-screen bg-hitam text-putih mb-36">
      <div className="px-12 pt-10 ">
        <div className="text-white text-3xl font-bold">Dashboard</div>
        <div className="mt-6 flex flex-col md:flex-row lg:flex-row gap-8">
          <WelcomeBox imageProfile={imageProfile} />
          <NotificationBox />
        </div>
        <div className="pt-32 ">
          <SpinMachine />
          {/* <RollingMachine /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
