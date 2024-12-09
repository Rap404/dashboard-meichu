import React, { useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { formProduct } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";

const CreateProduct = () => {
  const pages = ["Products", ">", "Create"];
  const [formData, setFormData] = useState({
    uuid: "",
    name: "",
    category: null,
    thumbnail: null,
    images: [],
    desription: "",
    price: "",
    product_link: "",
  });
  return (
    <div>
      <FormLayout
        formData={formProduct}
        pages={pages}
        changeHandler={(e) => handleChange(e, setFormData)}
        data={formData}
      />
    </div>
  );
};

export default CreateProduct;
