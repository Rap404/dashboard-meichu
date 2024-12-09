import React from "react";
import FormDefault from "../components/forms/FormDefault";
import { formCategories } from "../Constant";
import Button from "../components/buttons/Button";
import RegularButton from "../components/buttons/RegularButton";
import { useLocation, useNavigate } from "react-router-dom";

const FormLayout = ({
  formData,
  pages,
  isUseButton = true,
  changeHandler,
  fileHandler,
  filesHandler,
  file,
  data,
  mainFunc,
  scFunc,
  buttonName,
  itemsSelect,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;
  const getBasePath = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return navigate(`/${pathSegments[0]}`);
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
      <div className="mt-10">
        <FormDefault
          FormData={formData}
          changeHandler={changeHandler}
          fileHandler={fileHandler}
          filesHandler={filesHandler}
          file={file}
          data={data}
          itemsSelect={itemsSelect}
        />
      </div>
      <div className="flex flex-row pt-10 gap-4 mb-10">
        <RegularButton func={mainFunc} name={buttonName || "Create"} />
        {isUseButton ? (
          <>
            <Button func={scFunc} name={"Create & create another"} />
            <Button func={getBasePath} name={"cancel"} />
          </>
        ) : (
          <>
            <Button func={() => navigate("/")} name={"Cancel"} />
          </>
        )}
      </div>
    </div>
  );
};

export default FormLayout;
