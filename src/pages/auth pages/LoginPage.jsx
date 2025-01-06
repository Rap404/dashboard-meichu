import React, { useState } from "react";
import FormAuthentication from "../../components/forms/FormAuthentication";
import { formFieldLogin } from "../../Constant";
import SubmitButton from "../../components/buttons/SubmitButton";
import CheckBox from "../../components/input/CheckBox";
import { handleChange } from "../../lib/FormHandler";
import { errorNotif } from "../../components/text/Notification";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const rememberHandler = () => {
    if (remember == false) {
      setRemember(true);
    } else {
      setRemember(false);
    }
  };

  const handleLogin = async () => {
    try {
      await login(formData.identifier, formData.password);
      navigate("/");
    } catch (error) {
      console.error("error", error);
      setError("login failed");
    }
  };

  // console.log("Error:", error);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="text-red-500">{errorNotif(error)}</div>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-hitam">
      <div className="max-w-md w-full space-y-8 flex flex-col bg-secondary px-10 py-8 rounded-lg">
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold text-white ">
          <p className="font-semibold text-lg">Meichuu Dashboard</p>
          <span className="mt-3 font-extrabold text-2xl">Sign In</span>
        </div>
        <form>
          <FormAuthentication
            FormData={formFieldLogin}
            showPass={showPassword}
            func={() => setShowPassword(!showPassword)}
            changeHandler={(e) => handleChange(e, setFormData)}
            data={formData}
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
            <div className="">
              <button onClick={() => navigate("/forgot-password")}>
                <span className="text-oren text-sm">Forgot password?</span>
              </button>
            </div>
          </div>
          <SubmitButton func={handleLogin} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
