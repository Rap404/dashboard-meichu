import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const pages = ["Products", ">", "List"];
  const navigate = useNavigate();
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/products`);
      setProducts(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Products";
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const columns = [
    {
      header: "Name",
      accessor: (item) => item?.attributes?.name,
      nowrap: true,
    },
    {
      header: "Thumbnail",
      accessor: (item) => item?.attributes?.thumbnail?.data?.attributes?.url,
      nowrap: true,
      type: "image",
    },
    {
      header: "Images",
      accessor: (item) => item?.attributes?.images?.data?.length,
      nowrap: true,
      type: "files",
    },
    {
      header: "Price",
      accessor: (item) => item?.attributes?.price,
      nowrap: true,
      type: "price",
    },
    {
      header: "Likes",
      accessor: (item) => item?.attributes?.likes?.data?.length,
      nowrap: true,
      type: "likes",
    },
  ];

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleSelectAll = (selectedIds) => {
    console.log("Selected all:", selectedIds);
  };

  const handleRowSelect = (selectedIds) => {
    console.log("selected rows:", selectedIds);
  };

  return (
    <div>
      <PageLayout
        pages={pages}
        func={() => navigate("/products/create")}
        fetch={fetchProducts}
        buttonName={"Create product"}
        columns={columns}
        data={products}
        setError={setError}
        endpoint={"products"}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default ProductsPage;
