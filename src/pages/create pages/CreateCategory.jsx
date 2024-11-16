import React from "react";
import PageLayout from "../../layouts/PageLayout";
import FormLayout from "../../layouts/FormLayout";
import { formCategories } from "../../Constant";

const CreateCategory = () => {
  const pages = ["Categories", ">", "Create"];
  return (
    <div>
      <FormLayout pages={pages} formData={formCategories} />
    </div>
  );
};

export default CreateCategory;
