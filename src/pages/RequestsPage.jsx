import React from "react";
import PageLayout from "../layouts/PageLayout";

const RequestsPage = () => {
  const pages = ["Request", ">", "List"];
  return (
    <div>
      <PageLayout
        pages={pages}
        nav={"/products/create"}
        buttonName={"product"}
      />
    </div>
  );
};

export default RequestsPage;
