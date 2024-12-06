import React, { useEffect, useState } from "react";
import SubmitButton from "../components/buttons/SubmitButton";
import RegularButton from "../components/buttons/RegularButton";
import TableList from "../components/table/TableList";
import PageLayout from "../layouts/PageLayout";
import SelectItem from "../components/input/SelectItem";
import axios, { Axios } from "axios";
import { baseUrl } from "../Constant";
import TableComponent from "../components/table/TableComponent";

const CategoriesPage = () => {
  const pages = ["Categories", ">", "List"];
  const [categories, setCategories] = useState({});
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
      header: "Nama",
      accessor: (item) => item.attributes.name,
      nowrap: true,
    },
    {
      header: "Slug",
      accessor: (item) => item.attributes.slug,
      nowrap: true,
    },
    {
      header: "Products",
      accessor: (item) => item.attributes.products.data.length,
      type: "pro",
    },
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/categories/${id}`);
      await fetchCategories();
    } catch (err) {
      setError("Gagal menghapus kategori");
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/categories/edit/${id}`;
  };

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleSelectAll = (selectedIds) => {
    console.log("Selected all:", selectedIds);
  };

  const handleRowSelect = (selectedIds) => {
    console.log("Selected rows:", selectedIds);
  };

  return (
    <div className="">
      <PageLayout
        pages={pages}
        nav={"/categories/create"}
        buttonName={"category"}
        columns={columns}
        data={categories}
        onSearch={handleSearch}
        onSelectAll={handleSelectAll}
        onRowSelect={handleRowSelect}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default CategoriesPage;
