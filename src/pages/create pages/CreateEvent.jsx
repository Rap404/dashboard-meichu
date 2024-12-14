import React, { useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formEvent } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import { v4 as uuidV4 } from "uuid";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import { useAuth } from "../../lib/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { errorNotif, successNotif } from "../../components/text/Notification";
import LoadingComponent from "../../components/text/Loading";

const CreateEvent = () => {
  const pages = ["Events", ">", "Create"];
  const navigate = useNavigate();
  const { token } = useAuth();
  const initialFormState = {
    uuid: uuidV4(),
    name: "",
    image_cover: null,
    description: "",
    event_link: "",
    start_date: "",
    end_date: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(formData);

  const handleCreateEvent = async (e, resetForm = false) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const eventData = {
        uuid: formData.uuid,
        name: formData.name,
        description: formData.description,
        event_link: formData.event_link,
        start_date: formData.start_date,
        end_date: formData.end_date,
      };
      let imageId = null;
      if (
        formData.image_cover &&
        (formData.image_cover instanceof File ||
          formData.image_cover instanceof Blob)
      ) {
        const imageResponse = await uploadFileTostrapi(
          formData.image_cover,
          token
        );
        console.log(imageResponse);
        imageId = imageResponse[0].id;
        eventData.image_cover = imageId;
      }

      const response = await axios.post(
        `${baseUrl}/events`,
        { data: eventData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (resetForm) {
        setFormData(initialFormState);
      } else {
        navigate("/events");
      }
      successNotif("Events sucessfully made");
    } catch (error) {
      console.error(error);

      setError(error.response.data.error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div>
      <FormLayout
        formConstant={formEvent}
        formData={formData}
        setFormData={setFormData}
        pages={pages}
        changeHandler={(e) => handleChange(e, setFormData, setError)}
        mainFunc={(e) => handleCreateEvent(e)}
        scFunc={(e) => handleCreateEvent(e, true)}
      />
    </div>
  );
};

export default CreateEvent;
