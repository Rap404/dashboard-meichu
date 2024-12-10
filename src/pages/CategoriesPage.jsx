import React, { useEffect, useState } from "react";
import SubmitButton from "../components/buttons/SubmitButton";
import RegularButton from "../components/buttons/RegularButton";
import TableList from "../components/table/TableList";
import PageLayout from "../layouts/PageLayout";
import SelectItem from "../components/input/SelectItem";
import axios, { Axios } from "axios";
import { baseUrl } from "../Constant";
import TableComponent from "../components/table/TableComponent";
import { useNavigate } from "react-router-dom";

const CategoriesPage = () => {
  const pages = ["Categories", ">", "List"];
  const navigate = useNavigate();
  const [categories, setCategories] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    products: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/categories`);
      setCategories(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch categories";
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

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

  const handleEdit = (id) => {
    window.location.href = `/categories/edit/${id}`;
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <div className="">
      <PageLayout
        pages={pages}
        func={() => navigate("/categories/create")}
        fetch={fetchCategories}
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
