import React, { useState } from "react";
import SubmitButton from "../components/buttons/SubmitButton";
import RegularButton from "../components/buttons/RegularButton";
import TableList from "../components/table/TableList";
import PageLayout from "../layouts/PageLayout";
import SelectItem from "../components/input/SelectItem";

const CategoriesPage = () => {
  const pages = ["Categories", ">", "List"];

  return (
    <div className="">
      <PageLayout
        pages={pages}
        nav={"/categories/create"}
        buttonName={"category"}
      />
    </div>
  );
};

export default CategoriesPage;
