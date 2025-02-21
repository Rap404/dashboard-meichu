import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleChange } from "../../lib/FormHandler";
import { formResetPassword } from "../../Constant";
import FormAuthentication from "../../components/forms/FormAuthentication";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    password: "",
  });
  return (
    <div className="min-h-screen flex justify-center items-center bg-putihfrt dark:bg-hitam">
      <div className="max-w-md w-full space-y-8 flex flex-col bg-putihfrt dark:bg-secondary px-10 py-8 rounded-lg">
        <div className="absolute">
          <button onClick={() => navigate("/")}>
            <ArrowLeftIcon className="h-6 w-6 text-white" />
          </button>
        </div>
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold dark:text-white ">
          <p className="font-semibold text-lg">Meichuu Dashboard</p>
          <span className="mt-3 font-extrabold text-2xl">Reset Password</span>
        </div>
        <form>
          <FormAuthentication
            FormData={formResetPassword}
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
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
