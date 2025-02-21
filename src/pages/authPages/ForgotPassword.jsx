import React, { useState } from "react";
import FormAuthentication from "../../components/forms/FormAuthentication";
import { baseUrl, formForgotPassword } from "../../Constant";
import SubmitButton from "../../components/buttons/SubmitButton";
import { handleChange, oneHandleChange } from "../../lib/FormHandler";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { successNotif } from "../../components/text/Notification";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${baseUrl}/auth/forgot-password`,
        data
      );
      successNotif("Request successfully sended, please check your email");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-putihfrt dark:bg-hitam">
      <div className="max-w-md w-full space-y-8 flex flex-col border border-2-abumuda dark:border-abutua dark:bg-secondary px-10 py-8 rounded-lg">
        <div className="absolute">
          <button onClick={() => navigate("/")}>
            <ArrowLeftIcon className="h-6 w-6 dark:text-white" />
          </button>
        </div>
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold dark:text-white ">
          <p className="font-semibold text-lg">Meichuu Dashboard</p>
          <span className="mt-3 font-extrabold text-2xl">Reset Password</span>
        </div>
        <form>
          <FormAuthentication
            FormData={formForgotPassword}
            changeHandler={(e) => handleChange(e, setData)}
            data={data}
          />
          <div className="flex items-center justify-between pt-5 mb-6">
            <div className="flex gap-1">
              <span className="text-red-500">*</span>
              <span className="dark:text-white text-xs ">
                Check your email to recieve our message for change / reset
                password
              </span>
            </div>
          </div>
          <SubmitButton name="Submit" func={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
