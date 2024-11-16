import React from "react";
import PageLayout from "../layouts/PageLayout";

const AmbassadorPage = () => {
  const pages = ["Ambassadors", ">", "List"];
  return (
    <div className="">
      <PageLayout
        pages={pages}
        nav={"/ambassadors/create"}
        buttonName={"ambassador"}
      />
    </div>
  );
};

export default AmbassadorPage;
