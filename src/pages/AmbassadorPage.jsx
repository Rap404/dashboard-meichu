import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { assets } from "../assets/Assets";
import { AiOutlineLoading } from "react-icons/ai";

const AmbassadorPage = () => {
  const pages = ["Ambassadors", ">", "List"];
  const [ambassador, setAmbassador] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAmbassador = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/ambassadors`);
      setAmbassador(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Ambassador";
      setAmbassador([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmbassador();
  }, []);

  // console.log(ambassador);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const columns = [
    {
      header: "Nama",
      accessor: (item) => item.attributes.name,
      nowrap: true,
    },
    {
      header: "image",
      accessor: (item) => item.attributes.image.data.attributes.url,
      nowrap: true,
      type: "image",
    },
    {
      header: "Deskripsi",
      accessor: (item) => item.attributes.description,
      nowrap: true,
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
    <div className="">
      <PageLayout
        pages={pages}
        nav={"/ambassadors/create"}
        buttonName={"ambassador"}
        columns={columns}
        data={ambassador}
        onSearch={handleSearch}
        onSelectAll={handleSelectAll}
        onRowSelect={handleRowSelect}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default AmbassadorPage;
