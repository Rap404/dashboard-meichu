import React, { useEffect, useState } from "react";
import {
  customImageService,
  frontImageService,
} from "../../Api/services/contentService";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import LoadingComponent from "../../components/text/Loading";
import { errorNotif, successNotif } from "../../components/text/Notification";
import Slideshow from "../../components/CobaSlideShow";
import Button from "../../components/buttons/Button";
import SubmitButton from "../../components/buttons/SubmitButton";
import { useAuth } from "../../lib/AuthContext";
import Modal from "../../components/modal/Modal";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const FormCustomImages = ({ setOpenForm }) => {
  const { token } = useAuth();
  const [images, setImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await customImageService.getAllImages();
      setImages(response.data);
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
    if (images.length === 0) {
      return errorNotif("Please add images first");
    }
    try {
      setLoading(true);
      const data = {};

      if (images.length > 0) {
        const processImages = async () => {
          const imagePromises = images.map(async (image) => {
            if (image instanceof File || image instanceof Blob) {
              const response = await uploadFileTostrapi(
                image,
                "customImage",
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
          await customImageService.createImage(id);
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
    <div className="overflow-auto w-full">
      <button
        className="p-5 dark:text-putihfrt"
        onClick={() => setOpenForm(null)}
      >
        <ArrowLeftIcon width={30} height={30} />
      </button>
      <div className="flex flex-col w-full items-center justify-center gap-10 py-5 pt-10 px-20">
        <div className="">
          <p className="text-3xl font-bold text-black dark:text-white">
            Custom Product Images
          </p>
        </div>
        <Slideshow
          slides={images}
          setLoading={setLoading}
          setError={setError}
          removeNewImage={removeNewImage}
          deleteFunction={customImageService.delete}
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

export default FormCustomImages;
