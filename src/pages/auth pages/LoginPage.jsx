import React, { useState } from "react";
import FormAuthentication from "../../components/forms/FormAuthentication";
import { formFieldLogin } from "../../Constant";
import SubmitButton from "../../components/buttons/SubmitButton";
import CheckBox from "../../components/input/CheckBox";
import { handleChange } from "../../lib/FormHandler";
import { errorNotif } from "../../components/text/Notification";
import { useAuth } from "../../lib/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/text/Loading";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const rememberHandler = () => {
    if (remember == false) {
      setRemember(true);
    } else {
      setRemember(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(formData.identifier, formData.password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingComponent />;

  return (
    <div className="min-h-screen flex justify-center items-center bg-putihfrt dark:bg-hitam">
      {/* <div className="absolute"></div> */}
      <div className="max-w-md w-full space-y-8 flex flex-col border border-2-abumuda dark:border-abutua dark:bg-secondary px-10 py-8 rounded-lg">
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold dark:text-white ">
          <p className="font-semibold text-lg">Meichuu Dashboard</p>
          <span className="mt-3 font-extrabold text-2xl">Sign In</span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <FormAuthentication
            error={error}
            FormData={formFieldLogin}
            showPass={showPassword}
            func={() => setShowPassword(!showPassword)}
            changeHandler={(e) => handleChange(e, setFormData)}
            data={formData}
          />
          <div className="flex items-center justify-end py-5">
            <div className="">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
              >
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
