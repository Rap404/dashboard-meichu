import React, { useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { formEvent } from "../../Constant";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../../lib/FormHandler";

const CreateEvent = () => {
  const pages = ["Events", ">", "Create"];
  const [formData, setFormData] = useState({
    uuid: "",
    name: "",
    image_cover: "",
    description: "",
    event_link: "",
    start_date: "",
    end_date: "",
  });

  console.log(formData);

  return (
    <div>
      <FormLayout
        formData={formEvent}
        pages={pages}
        changeHandler={(e) => handleChange(e, setFormData)}
        data={formData}
      />
    </div>
  );
};

export default CreateEvent;
