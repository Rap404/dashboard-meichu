import React from "react";
import FormLayout from "../../layouts/FormLayout";

const CreateEvent = () => {
  const pages = ["Products", ">", "Create"];
  return (
    <div>
      <FormLayout pages={pages} />
    </div>
  );
};

export default CreateEvent;
