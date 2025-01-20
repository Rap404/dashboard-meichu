import {
  EnvelopeIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import IconGrayButton from "../buttons/IconGrayButton";
import { useNavigate } from "react-router-dom";

const NotificationBox = ({ newRequest }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white dark:bg-secondary border border-2-abutua dark:border-abutua rounded-xl items-center py-6 px-10">
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-5 ">
          <div className="relative">
            <span className="size-7 block text-hitam dark:text-white group-hover:text-oren transition-colors duration-200">
              <EnvelopeIcon />
            </span>
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">{newRequest.length}</span>
            </div>
          </div>
          <p className="text-hitam dark:text-white text-md">New request</p>
        </div>
        <IconGrayButton
          icon={<MagnifyingGlassCircleIcon />}
          text={"Find Out"}
          func={() => navigate("/requests")}
        />
      </div>
    </div>
  );
};

export default NotificationBox;
