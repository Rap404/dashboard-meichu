import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { Columns } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RequestsPage = () => {
  const pages = ["Request", ">", "List"];
  const navigate = useNavigate();
  const [requests, setRequest] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/requests`);
      setRequest(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Products";
      setRequest([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const column = [
    {
      header: "Nama",
      accessor: (item) => item.attributes.name,
      nowrap: true,
    },
    {
      header: "References",
      accessor: (item) => item.attributes.references.data.attributes.url,
      type: "image",
    },
    {
      header: "Is imvu+",
      accessor: (item) => item.attributes.imvu,
      type: "bool",
    },
    {
      header: "Type",
      accessor: (item) => item.attributes.productType,
      nowrap: true,
    },
    {
      header: "user",
      accessor: (item) => item.attributes.user.data.attributes.email,
    },
    {
      header: "",
      accessor: (item) => item.attributes.isNew,
      type: "notif",
    },
  ];

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
    <div>
      <PageLayout
        pages={pages}
        func={() => navigate("/products/create")}
        buttonName={"Create product"}
        columns={column}
        data={requests}
        onSearch={handleSearch}
        onSelectAll={handleSelectAll}
        onRowSelect={handleRowSelect}
        loading={loading}
        pagination={true}
        isActions={false}
      />
    </div>
  );
};

export default RequestsPage;
