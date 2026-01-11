import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import UseDebounce from "../hooks/UseDebounce";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import { customCategoryService } from "../Api/services/customCategoriesService";
import { useNavigate } from "react-router-dom";

const CustomCategoriesPage = () => {
  const pages = ["Custom Requests Categories", ">", "List"];
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const debounceSearchValue = UseDebounce(searchQuery, 800);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await customCategoryService.getAllData();
      setCategories(data.data);
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
      const data = await customCategoryService.searchCategories(query);
      setCategories(data.data);
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
      header: "Description",
      accessor: (item) => item.attributes.isBundle,
      type: "catBool",
    },
    {
      header: "Requests",
      accessor: (item) => item.attributes.requests.data.length,
      type: "pro",
    },
  ];

  return (
    <div>
      {" "}
      <PageLayout
        pages={pages}
        func={() => navigate("/custom-categories/create")}
        fetch={fetchCategories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonName={"Create Category"}
        columns={columns}
        data={categories}
        setError={setError}
        endpoint={"custom-categories"}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default CustomCategoriesPage;
