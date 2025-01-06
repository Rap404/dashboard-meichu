import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useNavigate } from "react-router-dom";
import UseDebounce from "../hooks/UseDebounce";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";

const ProductsPage = () => {
  const pages = ["Products", ">", "List"];
  const navigate = useNavigate();
  const [products, setProducts] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = UseDebounce(searchQuery, 800);
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

  const fetchSearchedProducts = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/products/search?query=${query}`
      );
      setProducts(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to search products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue?.trim()) {
      fetchSearchedProducts(debounceSearchValue);
    } else {
      fetchProducts();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

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

  return (
    <div>
      <PageLayout
        pages={pages}
        func={() => navigate("/products/create")}
        fetch={fetchProducts}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
