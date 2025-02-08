import React from "react";
import FormDefault from "../components/forms/FormDefault";
import Button from "../components/buttons/Button";
import RegularButton from "../components/buttons/RegularButton";
import { useLocation, useNavigate } from "react-router-dom";

const FormLayout = ({
  formConstant,
  formData,
  setFormData,
  availableItems,
  pages,
  multiSelectValue,
  selectValue,
  isUseButton = true,
  changeHandler,
  fileHandler,
  filesHandler,
  file,
  mainFunc,
  scFunc,
  buttonName,
  scButtonName,
  onMultiChange,
  onSelectChange,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBasePath = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return navigate(pathSegments.length === 1 ? "/" : `/${pathSegments[0]}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const buttonClicked = e.nativeEvent.submitter.value;

    if (buttonClicked === "main") {
      mainFunc();
    } else if (buttonClicked === "createanother") {
      scFunc();
    }
  };

  return (
    <div className="min-h-screen ps-12 pe-6 pt-10 bg-white dark:bg-hitam mb-40">
      <div className="w-full">
        <div className="flex flex-row gap-4 text-sm text-zinc-400">
          {pages.map((page, index) => (
            <span key={index}>{page}</span>
          ))}
        </div>
        <div className="flex flex-row justify-between my-2">
          <div className="text-hitam dark:text-white text-3xl font-bold">
            {pages[0]}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-10">
          <FormDefault
            formConstant={formConstant}
            FormData={formData}
            setFormData={setFormData}
            file={file}
            availableItems={availableItems}
            multiSelectValue={multiSelectValue}
            selectValue={selectValue}
            changeHandler={changeHandler}
            fileHandler={fileHandler}
            filesHandler={filesHandler}
            onMultiChange={onMultiChange}
            onSelectChange={onSelectChange}
          />
        </div>
        <div className="flex flex-row pt-10 gap-4 mb-10">
          <RegularButton value="main" name={buttonName || pages[2]} />
          {isUseButton ? (
            <>
              <Button
                value={"createanother"}
                name={scButtonName ? scButtonName : "Create & create another"}
              />
              <Button func={getBasePath} name={"cancel"} />
            </>
          ) : (
            <>
              <Button func={getBasePath} name={"Cancel"} />
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormLayout;
