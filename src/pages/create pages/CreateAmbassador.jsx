import React from "react";
import FormLayout from "../../layouts/FormLayout";

const CreateAmbassador = () => {
  const pages = ["Categories", ">", "Create"];
  return (
    <div>
      <FormLayout pages={pages} />
    </div>
  );
};

export default CreateAmbassador;
