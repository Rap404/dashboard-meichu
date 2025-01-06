import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formEvent } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import { useAuth } from "../../lib/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { errorNotif, successNotif } from "../../components/text/Notification";
import LoadingComponent from "../../components/text/Loading";

const FormEvent = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = ["Events", ">", id ? "Edit" : "Create"];
  const initialFormState = {
    name: "",
    image_cover: null,
    description: "",
    event_link: "",
    start_date: "",
    end_date: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchEvent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/events/${id}`);
      setEvent(response.data || []);
      console.log(response);
      const eventData = response.data.data.attributes;
      setFormData({
        name: eventData.name,
        description: eventData.description,
        event_link: eventData.event_link,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        image_cover: eventData.image_cover?.data?.attributes?.url || null,
      });
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch event";
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateEvent = async (e, resetForm = false) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const eventData = {
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
          formData.name,
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

  const handleUpdateEvent = async (e) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const eventData = {
        name: formData.name,
        description: formData.description,
        event_link: formData.event_link,
        start_date: formData.start_date,
        end_date: formData.end_date,
      };

      let image_id = null;
      if (
        formData.image_cover instanceof File ||
        formData.image_cover instanceof Blob
      ) {
        const imageResponse = await uploadFileTostrapi(
          formData.image_cover,
          formData.name,
          token
        );
        image_id = imageResponse[0].id;
        eventData.image_cover = image_id;
      } else if (
        typeof formData.image_cover === "string" ||
        typeof formData.image_cover === "object"
      ) {
        eventData.image_cover = event.data.attributes.image_cover.id;
      } else {
        eventData.image_cover = null;
      }

      const response = await axios.put(
        `${baseUrl}/events/${id}`,
        { data: eventData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      successNotif("Event successfully updated");
      navigate("/events");
    } catch (error) {
      console.error("error", error);

      setError(error.response.data.error.name);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    id ? handleFetchEvent() : "";
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div>
      <FormLayout
        formConstant={formEvent}
        formData={formData}
        pages={pages}
        setFormData={setFormData}
        changeHandler={(e) => handleChange(e, setFormData, setError)}
        mainFunc={(e) => (id ? handleUpdateEvent(e) : handleCreateEvent(e))}
        scFunc={(e) => handleCreateEvent(e, true)}
        isUseButton={id ? false : true}
      />
    </div>
  );
};

export default FormEvent;
