import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-hitam z-10">
      <div className="w-25 ma2 h4 items-center justify-center flex flex-column flex-wrap">
        <ReactLoading type="spinningBubbles" color="#F59E0B" />
      </div>
    </div>
  );
};

export default LoadingComponent;
