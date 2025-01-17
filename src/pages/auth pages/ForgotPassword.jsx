import React, { useState } from "react";
import FormAuthentication from "../../components/forms/FormAuthentication";
import { formForgotPassword } from "../../Constant";
import SubmitButton from "../../components/buttons/SubmitButton";
import { handleChange, oneHandleChange } from "../../lib/FormHandler";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex justify-center items-center bg-hitam">
      <div className="max-w-md w-full space-y-8 flex flex-col bg-secondary px-10 py-8 rounded-lg">
        <div className="absolute">
          <button onClick={() => navigate("/")}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold text-white ">
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
              <span className="text-white text-xs ">
                Check your email to recieve our message for change / reset
                password
              </span>
            </div>
          </div>
          <SubmitButton name="Submit" func={() => console.log("")} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
