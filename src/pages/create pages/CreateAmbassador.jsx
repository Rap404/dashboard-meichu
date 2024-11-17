import React from "react";
import FormLayout from "../../layouts/FormLayout";
import { formAmbassador } from "../../Constant";

const CreateAmbassador = () => {
  const pages = ["Categories", ">", "Create"];
  return (
    <div>
      <FormLayout pages={pages} formData={formAmbassador} />
    </div>
  );
};

export default CreateAmbassador;
