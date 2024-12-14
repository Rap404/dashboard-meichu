import React, { useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formAmbassador } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import { v4 as uuidV4 } from "uuid";
import LoadingComponent from "../../components/text/Loading";
import { errorNotif, successNotif } from "../../components/text/Notification";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import { useAuth } from "../../lib/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAmbassador = () => {
  const pages = ["Ambassadors", ">", "Create"];
  const navigate = useNavigate();
  const { token } = useAuth();
  const initialFormState = {
    uuid: uuidV4(),
    name: "",
    image: null,
    description: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(formData);

  const handleCreateAmbassador = async (e, resetForm = false) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const ambassadorData = {
        uuid: formData.uuid,
        name: formData.name,
        description: formData.description,
        socmed_links: {
          twitter: formData.twitter,
          instagram: formData.instagram,
          youtube: formData.youtube,
          tiktok: formData.tiktok,
        },
      };
      let imageId = null;
      if (
        formData.image &&
        (formData.image instanceof File || formData.image instanceof Blob)
      ) {
        const imageResponse = await uploadFileTostrapi(formData.image, token);
        console.log(imageResponse);
        imageId = imageResponse[0].id;
        ambassadorData.image = imageId;
      }

      const response = await axios.post(
        `${baseUrl}/ambassadors`,
        { data: ambassadorData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resetForm) {
        setFormData(initialFormState);
      } else {
        navigate("/ambassadors");
      }
      successNotif("Ambassador sucessfully created");
    } catch (error) {
      console.error(error);

      setError(error?.response?.data?.error?.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div>
      <FormLayout
        formConstant={formAmbassador}
        formData={formData}
        setFormData={setFormData}
        pages={pages}
        changeHandler={(e) => handleChange(e, setFormData, setError)}
        mainFunc={(e) => handleCreateAmbassador(e)}
        scFunc={(e) => handleCreateAmbassador(e, true)}
      />
    </div>
  );
};

export default CreateAmbassador;
