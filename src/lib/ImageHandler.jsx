import axios from "axios";
import { baseUrl, mediaUrl } from "../Constant";

export const uploadFileTostrapi = async (file, fileName, token) => {
  const formData = new FormData();

  const renamedFile = `${fileName} image`;
  const newFile = new File([file], renamedFile, { type: file.type });

  formData.append("files", newFile);

  const response = await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const handleImages = (img, field, setFormData) => {
  try {
    if (img instanceof File || img instanceof Blob) {
      const objectUrl = URL.createObjectURL(img);
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev.images || []), img],
      }));

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof img === "string") {
      const finalUrl = img.startsWith("/uploads") ? `${mediaUrl}${img}` : img;

      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev.images || []), finalUrl],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  } catch (error) {
    console.error("Error handling image:", error);
    setFormData((prev) => ({
      ...prev,
      [field]: null,
    }));
  }
};

export const handleImage = (img, field, setFormData) => {
  try {
    if (img instanceof File || img instanceof Blob) {
      const objectUrl = URL.createObjectURL(img);
      setFormData((prev) => ({
        ...prev,
        [field]: img,
      }));

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof img === "string") {
      const finalUrl = img.startsWith("/uploads") ? `${mediaUrl}${img}` : img;

      setFormData((prev) => ({
        ...prev,
        [field]: finalUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  } catch (error) {
    console.error("Error handling image:", error);
    setFormData((prev) => ({
      ...prev,
      [field]: null,
    }));
  }
};
