import React, { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl, detailRequest } from "../../Constant";
import { errorNotif } from "../../components/text/Notification";
import LoadingComponent from "../../components/text/Loading";
import FormLayout from "../../layouts/FormLayout";
import Button from "../../components/buttons/Button";
import RegularButton from "../../components/buttons/RegularButton";

const Requestdetail = () => {
  const { token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const pages = ["Request", ">", "Detail"];
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    isIMVU: "",
    type: "",
    user: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/requests/${id}`);
      setFormData({
        name: response?.data?.data.attributes?.name,
        image:
          response?.data?.data?.attributes?.references?.data?.attributes?.url,
        isIMVU: response?.data?.data?.attributes?.imvu ? "Imvu+" : "Non Imvu",
        type: response?.data?.data?.attributes?.productType,
        user: response?.data?.data?.attributes?.user?.data?.attributes
          ?.username,
        phone:
          response?.data?.data?.attributes?.user?.data?.attributes
            ?.telephoneNumber,
      });
      console.log(response);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "failed fetch request");
    } finally {
      setLoading(false);
    }
  };

  useState(() => {
    fetchRequest();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div className="ps-12 pe-6 pt-10 min-h-screen bg-hitam">
      <div className="w-full">
        <div className="flex flex-row gap-4 text-sm text-zinc-400">
          {pages.map((page, index) => (
            <span key={index}>{page}</span>
          ))}
        </div>
        <div className="flex flex-row justify-between my-2">
          <div className="text-white text-3xl font-bold">{pages[0]}</div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row gap-20 items-center">
        <div className="rounded-lg">
          <img className="max-h-96 p-3" src={formData.image} alt="" />
        </div>
        <div className="flex flex-col">
          {detailRequest.map((field, index) => (
            <div key={index} className="flex">
              <div className="flex my-7 ps-5 items-center gap-5">
                <label
                  htmlFor={field.id}
                  className="text-white w-20 md:w-32 lg:w-32"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  className="bg-secondary text-abumuda p-2 rounded-md"
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
          <Button func={() => navigate("/requests")} name={"cancel"} />
        </>
      </div>
    </div>
  );
};

export default Requestdetail;
