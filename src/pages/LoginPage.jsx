import React, { useState } from "react";
import FormAuthentication from "../components/forms/FormAuthentication";
import { formFieldLogin } from "../Constant";
import SubmitButton from "../components/buttons/SubmitButton";
import CheckBox from "../components/input/CheckBox";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const rememberHandler = () => {
    if (remember == false) {
      setRemember(true);
    } else {
      setRemember(false);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-hitam">
      <div className="max-w-md w-full space-y-8 flex flex-col bg-secondary px-10 py-8 rounded-lg">
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold text-white ">
          <p className="font-semibold text-lg">Meichuu Dashboard</p>
          <span className="mt-3 font-extrabold text-2xl">Sign In</span>
        </div>
        <form action="">
          <FormAuthentication
            FormData={formFieldLogin}
            showPass={showPassword}
            func={() => setShowPassword(!showPassword)}
          />
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center">
              <CheckBox onChange={rememberHandler} checked={remember} />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div>
          </div>
          <SubmitButton />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
