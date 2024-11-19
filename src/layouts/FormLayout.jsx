import React from "react";
import FormDefault from "../components/forms/FormDefault";
import { formCategories } from "../Constant";
import Button from "../components/buttons/Button";
import RegularButton from "../components/buttons/RegularButton";
import { useLocation, useNavigate } from "react-router-dom";

const FormLayout = ({ formData, pages }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const getBasePath = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    // Mengambil segment pertama dari path untuk kembali ke halaman utama
    return `/${pathSegments[0]}`;
  };
  return (
    <div className="ps-12 pe-6 pt-10 min-h-screen bg-hitam">
      <div className="w-full">
        <div className="flex flex-row gap-4 text-sm text-zinc-400">
          {pages.map((page, index) => (
            <span key={index}>{page}</span>
          ))}
        </div>
        <div className="flex flex-row justify-between my-2">
          <div className="text-white text-3xl font-bold">{pages[0]}</div>
        </div>
      </div>
      <div className="">
        <FormDefault FormData={formData} />
      </div>
      <div className="flex flex-row pt-10 gap-4">
        <RegularButton nav={"/"} name={"Create"} />
        <Button func={() => navigate(path)} name={"Create & create another"} />
        <Button func={() => getBasePath} name={"Cancel"} />
      </div>
    </div>
  );
};

export default FormLayout;
