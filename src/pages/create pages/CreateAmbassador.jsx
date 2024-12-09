import React, { useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { formAmbassador } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";

const CreateAmbassador = () => {
  const pages = ["Ambassadors", ">", "Create"];
  const [formData, setFormData] = useState({
    uuid: "",
    name: "",
    image: null,
    description: "",
    socmed_links: {},
  });
  return (
    <div>
      <FormLayout
        pages={pages}
        formData={formAmbassador}
        changeHandler={(e) => handleChange(e, setFormData)}
        data={formData}
      />
    </div>
  );
};

export default CreateAmbassador;
