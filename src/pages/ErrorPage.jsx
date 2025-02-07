import { CircleAlert } from "lucide-react";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-12">
        <div className="flex justify-center">
          <span>
            <CircleAlert size={140} className="text-red-500" />
          </span>
        </div>
        <div className="flex justify-center">
          <span className="dark:text-white text-6xl">Page not found</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
