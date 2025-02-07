import React, { useEffect, useState } from "react";
import Slideshow from "../components/CobaSlideShow";
import Modal from "../components/modal/Modal";
import { baseUrl } from "../Constant";
import Button from "../components/buttons/Button";
import SubmitButton from "../components/buttons/SubmitButton";
import LoadingComponent from "../components/text/Loading";
import { errorNotif, successNotif } from "../components/text/Notification";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import { uploadFileTostrapi } from "../lib/ImageHandler";

const ContentPage = () => {
  const { token } = useAuth();
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/banner-images`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(response.data.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const setSelectedImage = (image) => {
    setImages([...images, image]);
  };

  const removeNewImage = (index) => {
    setImages((prev) => {
      const newData = images.filter((_, i) => i !== index);

      return newData;
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const data = {};

      if (images.length > 0) {
        const processImages = async () => {
          const imagePromises = images.map(async (image) => {
            if (image instanceof File || image instanceof Blob) {
              const response = await uploadFileTostrapi(
                image,
                "frontImage",
                token
              );
              return response[0].id;
            }
            return null;
          });

          const ImageIds = await Promise.all(imagePromises);
          return ImageIds.filter((id) => id !== null);
        };

        data.images = await processImages();
      } else {
        data.images = [];
      }

      await Promise.all(
        data.images.map(async (id) => {
          await axios.post(
            `${baseUrl}/banner-images`,
            { data: { image: id } },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        })
      );

      fetchImages();
      setModalOpen(false);
      successNotif("Images saved successfully");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error.message);

  return (
    <div className="overflow-auto w-full h-screen py-10 px-20">
      <div className="flex flex-col w-full items-center justify-center gap-10">
        <div className="">
          <p className="text-3xl font-bold text-black dark:text-white">
            Front Images Preview
          </p>
        </div>
        <Slideshow
          slides={images}
          setLoading={setLoading}
          setError={setError}
          removeNewImage={removeNewImage}
          fetch={fetchImages}
        />
        <div className="flex gap-5">
          <Button name={"Add Image"} func={() => setModalOpen(true)} />
          <SubmitButton name={"Save"} func={handleSave} />
        </div>
      </div>
      {modalOpen && (
        <Modal
          setSelectedImage={setSelectedImage}
          closeModal={() => setModalOpen(false)}
          cropPreset={"portrait"}
        />
      )}
    </div>
  );
};

export default ContentPage;
