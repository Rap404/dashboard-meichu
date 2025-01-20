import React, { useEffect, useState } from "react";
import FormLayout from "../../layouts/FormLayout";
import { baseUrl, formAmbassador } from "../../Constant";
import { handleChange } from "../../lib/FormHandler";
import LoadingComponent from "../../components/text/Loading";
import { errorNotif, successNotif } from "../../components/text/Notification";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import { useAuth } from "../../lib/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormAmbassador = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const pages = ["Ambassadors", ">", id ? "Edit" : "Create"];
  const navigate = useNavigate();
  const initialFormState = {
    name: "",
    image: null,
    description: "",
    twitter: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [ambassador, setAmbassador] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchAmbassador = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/ambassadors/${id}`);
      setAmbassador(response.data || []);
      const ambassadorData = response.data.data.attributes;
      setFormData({
        name: ambassadorData.name,
        description: ambassadorData.description,
        twitter: ambassadorData.socmed_links.twitter,
        instagram: ambassadorData.socmed_links.instagram,
        youtube: ambassadorData.socmed_links.youtube,
        tiktok: ambassadorData.socmed_links.tiktok,
        image: ambassadorData.image?.data?.attributes?.url || null,
      });
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch ambassador";
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAmbassador = async (e, resetForm = false) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const ambassadorData = {
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
        const imageResponse = await uploadFileTostrapi(
          formData.image,
          formData.name + " photo",
          token
        );
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

  const handleUpdateAmbassador = async (e) => {
    e?.preventdefault();
    try {
      setLoading(true);
      const ambassadorData = {
        name: formData.name,
        description: formData.description,
        socmed_links: {
          twitter: formData.twitter,
          instagram: formData.instagram,
          youtube: formData.youtube,
          tiktok: formData.tiktok,
        },
      };

      let image_id = null;
      if (formData.image instanceof File || formData.image instanceof Blob) {
        const imageResponse = await uploadFileTostrapi(
          formData.image,
          formData.name + " photo",
          token
        );
        image_id = imageResponse[0].id;
        ambassadorData.image = image_id;
      } else if (
        typeof formData.image === "string" ||
        typeof formData.image === "object"
      ) {
        ambassadorData.image = ambassador.data.attributes.image.id;
      } else {
        ambassadorData.image = null;
      }

      const response = await axios.put(
        `${baseUrl}/ambassadors/${id}`,
        { data: ambassadorData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      successNotif("Ambassador successfully updated");
      navigate("/ambassadors");
    } catch (error) {
      console.error("error", error);

      setError(error?.response?.data?.error?.name);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    id ? handleFetchAmbassador() : setFormData(initialFormState);
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div className="h-screen overflow-auto">
      <FormLayout
        formConstant={formAmbassador}
        formData={formData}
        pages={pages}
        setFormData={setFormData}
        changeHandler={(e) => handleChange(e, setFormData, setError)}
        mainFunc={(e) =>
          id ? handleUpdateAmbassador(e) : handleCreateAmbassador(e)
        }
        scFunc={(e) => handleCreateAmbassador(e, true)}
        isUseButton={id ? false : true}
      />
    </div>
  );
};

export default FormAmbassador;
