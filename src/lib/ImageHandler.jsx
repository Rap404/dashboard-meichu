import axios from "axios";
import { baseUrl } from "../Constant";

export const uploadFileTostrapi = async (file, token) => {
  const formData = new FormData();
  formData.append("files", file);

  const response = await axios.post(`${baseUrl}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
