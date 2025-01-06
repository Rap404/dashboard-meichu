import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useNavigate } from "react-router-dom";
import UseDebounce from "../hooks/UseDebounce";
import { errorNotif } from "../components/text/Notification";
import LoadingComponent from "../components/text/Loading";

const CategoriesPage = () => {
  const pages = ["Categories", ">", "List"];
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = UseDebounce(searchQuery, 800);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/categories`);
      setCategories(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to fetch categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedCategories = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/categories/search?query=${query}`
      );
      setCategories(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message || "Failed to search categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue?.trim()) {
      fetchSearchedCategories(debounceSearchValue);
    } else {
      fetchCategories();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  const columns = [
    {
      header: "Name",
      accessor: (item) => item.attributes.name,
      nowrap: true,
    },
    {
      header: "Products",
      accessor: (item) => item.attributes.products.data.length,
      type: "pro",
    },
  ];

  return (
    <div className="">
      <PageLayout
        pages={pages}
        func={() => navigate("/categories/create")}
        fetch={fetchCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonName={"Create Category"}
        columns={columns}
        data={categories}
        setError={setError}
        endpoint={"categories"}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default CategoriesPage;
