import React from "react";
import PageLayout from "../layouts/PageLayout";

const UsersPage = () => {
  const pages = ["Users", ">", "List"];
  return (
    <div>
      <PageLayout pages={pages} nav={"/users/create"} buttonName={"user"} />
    </div>
  );
};

export default UsersPage;
