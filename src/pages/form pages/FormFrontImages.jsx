import React, { useEffect, useState } from "react";
import { frontImageService } from "../../Api/services/contentService";
import { uploadFileTostrapi } from "../../lib/ImageHandler";
import LoadingComponent from "../../components/text/Loading";
import { errorNotif, successNotif } from "../../components/text/Notification";
import Slideshow from "../../components/CobaSlideShow";
import Button from "../../components/buttons/Button";
import SubmitButton from "../../components/buttons/SubmitButton";
import { useAuth } from "../../lib/AuthContext";
import Modal from "../../components/modal/Modal";

const FormFrontImages = () => {
  const { token } = useAuth();
  const [frontImages, setFrontImages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await frontImageService.getAllImages();
      setFrontImages(response.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const setSelectedImage = (image) => {
    setFrontImages([...frontImages, image]);
  };

  const removeNewImage = (index) => {
    setFrontImages((prev) => {
      const newData = frontImages.filter((_, i) => i !== index);

      return newData;
    });
  };

  const handleSaveFI = async () => {
    try {
      setLoading(true);
      const data = {};

      if (frontImages.length > 0) {
        const processImages = async () => {
          const imagePromises = frontImages.map(async (image) => {
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

        data.frontImages = await processImages();
      } else {
        data.frontImages = [];
      }

      await Promise.all(
        data.frontImages.map(async (id) => {
          await frontImageService.createImage(id);
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
    <div className="overflow-auto w-full py-5 px-20">
      <div className="flex flex-col w-full items-center justify-center gap-10">
        <div className="">
          <p className="text-3xl font-bold text-black dark:text-white">
            slideShow Images
          </p>
        </div>
        <Slideshow
          slides={frontImages}
          setLoading={setLoading}
          setError={setError}
          removeNewImage={removeNewImage}
          deleteFunction={frontImageService.delete}
          fetch={fetchImages}
        />
        <div className="flex gap-5">
          <Button name={"Add Image"} func={() => setModalOpen(true)} />
          <SubmitButton name={"Save"} func={handleSaveFI} />
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

export default FormFrontImages;
