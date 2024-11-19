import React from "react";
import FormLayout from "../../layouts/FormLayout";
import { formProduct } from "../../Constant";

const CreateProduct = () => {
  const pages = ["Products", ">", "Create"];
  return (
    <div>
      <FormLayout formData={formProduct} pages={pages} />
    </div>
  );
};

export default CreateProduct;
