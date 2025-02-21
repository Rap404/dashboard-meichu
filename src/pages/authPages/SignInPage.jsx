import React, { useState } from "react";
import SubmitButton from "../../components/buttons/SubmitButton";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    identifier,
  });
  const [error, setError] = useState(null);
  return (
    <div className="min-h-screen flex justify-center items-center bg-putihfrt dark:bg-hitam">
      {/* <div className="absolute"></div> */}
      <div className="max-w-md w-full space-y-8 flex flex-col border border-2-abumuda dark:border-abutua dark:bg-secondary px-10 py-8 rounded-lg">
        <div className="mt-3 flex flex-col items-center text-3xl font-extrabold dark:text-white ">
          <p className="font-semibold text-lg">Meichuu Dashboard</p>
          <span className="mt-3 font-extrabold text-2xl">Sign In</span>
        </div>
        <form
        //   onSubmit={(e) => {
        //     e.preventDefault();
        //     handleLogin();
        //   }}
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
          <SubmitButton func={""} />
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
