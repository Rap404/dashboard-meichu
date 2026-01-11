import React, { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, detailRequest } from "../../Constant";
import { errorNotif } from "../../components/text/Notification";
import LoadingComponent from "../../components/text/Loading";
import Button from "../../components/buttons/Button";
import RegularButton from "../../components/buttons/RegularButton";
import { requestsService } from "../../Api/services/requestsService";

const Requestdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = ["Request", ">", "Detail"];
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    isIMVU: "",
    category: [],
    type: "",
    user: "",
    email: "",
    phone: "",
  });
  const [isFullImage, setIsFullImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const update = await requestsService.updateRequests(id, {
        data: { isNew: false },
      });
      const response = await requestsService.getRequestById(id);

      console.log(response);

      setFormData({
        name: response?.data?.attributes?.name,
        image: response?.data?.attributes?.references?.data?.attributes?.url,
        isIMVU: response?.data?.attributes?.imvu ? "Imvu+" : "Non Imvu",
        type: response?.data?.attributes?.productType,
        user: response?.data?.attributes?.user?.data?.attributes?.username,
        email: response?.data.attributes.user.data.attributes.email,
        phone:
          response?.data?.attributes?.user?.data?.attributes?.telephoneNumber,
        category: [],
      });

      if (response?.data?.attributes?.custom_categories?.data?.length > 0) {
        const categoryNames =
          response.data.attributes.custom_categories.data.map(
            (category) => category.attributes.name
          );

        setFormData((prev) => ({
          ...prev,
          category: categoryNames,
        }));
      }

      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "failed fetch request");
    } finally {
      setLoading(false);
    }
  };

  console.log(formData.category);

  useState(() => {
    fetchRequest();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div className="ps-12 pe-6 pt-10 py-10 h-screen overflow-auto dark:bg-hitam">
      <div className="w-full">
        <div className="flex flex-row gap-4 text-sm text-zinc-400">
          {pages.map((page, index) => (
            <span key={index}>{page}</span>
          ))}
        </div>
        <div className="flex flex-row justify-between my-2">
          <div className="text-hitam dark:text-white text-3xl font-bold">
            {pages[0]}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-20 my-7 items-center">
        <div
          className="flex flex-col rounded-lg"
          onClick={() => setIsFullImage(true)}
        >
          <img className="max-h-64 p-3" src={formData.image} alt="" />
          <span className="dark:text-putihfrt">
            click the picture to set it full screen and click again to close
          </span>
        </div>
        <div className="flex flex-col">
          {detailRequest.map((field, index) => (
            <div key={index} className="flex">
              <div className="flex my-3 ps-5 items-center gap-5">
                <label
                  htmlFor={field.id}
                  className="dark:text-white w-20 md:w-32 lg:w-32"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  className="border-2 dark:border-abutua dark:bg-secondary dark:text-abumuda p-2 rounded-md w-full"
                  value={formData[field.id] || "-"}
                  disabled
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-row pt-10 gap-4 mb-10">
        <>
          <RegularButton
            func={() => navigate("/products/create")}
            name={"Create products"}
          />
          <Button func={() => navigate("/requests")} name={"Back"} />
        </>
      </div>
      {isFullImage && (
        <div className="relative" onClick={() => setIsFullImage(false)}>
          <div className="fixed inset-0 bg-opacity-75 transition-all backdrop-blur-sm">
            <div className="fixed inset-0 w-screen  overflow-y-auto">
              <div className="flex h-screen justify-center items-center px-20 py-20 text-center">
                <img
                  className="w-full md:h-full lg:h-full"
                  src={formData.image}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Requestdetail;
