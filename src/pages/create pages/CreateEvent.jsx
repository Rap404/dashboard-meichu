import React from "react";
import FormLayout from "../../layouts/FormLayout";
import { formEvent } from "../../Constant";

const CreateEvent = () => {
  const pages = ["Products", ">", "Create"];
  return (
    <div>
      <FormLayout formData={formEvent} pages={pages} />
    </div>
  );
};

export default CreateEvent;
