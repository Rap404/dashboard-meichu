import React from "react";
import FormDefault from "../components/forms/FormDefault";
import { formCategories } from "../Constant";
import RegularButton from "../components/buttons/RegularButton";
import Button from "../components/buttons/Button";

const HomePage = () => {
  return (
    <div className="justify-center h-screen bg-hitam text-putih">
      <div className="ps-12 pt-10">
        <FormDefault FormData={formCategories} />
        <RegularButton nav={"/"} />
        <Button nav={"/categories/create"} name={"Create & create another"} />
        <Button nav={"/categories"} name={"Cancel"} />
      </div>
    </div>
  );
};

export default HomePage;
