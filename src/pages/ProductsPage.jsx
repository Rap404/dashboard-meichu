import React from "react";
import PageLayout from "../layouts/PageLayout";

const ProductsPage = () => {
  const pages = ["Products", ">", "List"];
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

export default ProductsPage;
