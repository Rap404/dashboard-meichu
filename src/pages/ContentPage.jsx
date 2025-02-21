import React, { useState } from "react";
import FormFrontImages from "./formPages/FormFrontImages";
import FormCustomImages from "./formPages/formCustomImages";
import { FilmIcon } from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/outline";

const ContentPage = () => {
  const [openForm, setOpenForm] = useState(null);

  const renderPage = () => {
    return (
      <>
        <div className="flex w-full justify-center">
          <p className="text-4xl font-bold dark:text-white">Choose content</p>
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row mt-20 md:mt-0 lg:mt-0 justify-center h-full items-center gap-10">
          <button
            className="flex flex-col items-center border border-abumuda hover:border-oren p-10 text-hitam dark:text-putihfrt group"
            onClick={() => setOpenForm("banner")}
          >
            <span className="w-36 h-36 group-hover:text-oren">
              <PhotoIcon />
            </span>
            <div className="">Front Images Banner</div>
          </button>
          <button
            className="flex flex-col items-center border  border-abumuda hover:border-oren p-5 md:p-10 lg:p-10 text-hitam dark:text-putihfrt group"
            onClick={() => setOpenForm("custom")}
          >
            <span className="w-36 h-36 group-hover:text-oren">
              <FilmIcon />
            </span>
            <div className="">Custom Products Images</div>
          </button>
        </div>
      </>
    );
  };

  const choosePage = () => {
    switch (openForm) {
      case "banner":
        return <FormFrontImages setOpenForm={setOpenForm} />;

      case "custom":
        return <FormCustomImages setOpenForm={setOpenForm} />;

      default:
        return renderPage();
    }
  };

  return (
    <div className="overflow-auto w-full h-screen py-10 pb-32 px-0 md:px-10 lg:px-20">
      {choosePage()}
    </div>
  );
};

export default ContentPage;
