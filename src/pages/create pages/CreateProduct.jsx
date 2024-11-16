import React from "react";
import FormLayout from "../../layouts/FormLayout";

const CreateProduct = () => {
  const pages = ["Products", ">", "Create"];
  return (
    <div>
      <FormLayout pages={pages} />
    </div>
  );
};

export default CreateProduct;
