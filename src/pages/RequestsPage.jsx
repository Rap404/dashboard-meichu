import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { Columns } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import UseDebounce from "../hooks/UseDebounce";

const RequestsPage = () => {
  const pages = ["Request", ">", "List"];
  const navigate = useNavigate();
  const [requests, setRequests] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = UseDebounce(searchQuery, 800);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/requests`);
      setRequests(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch requests";
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedRequests = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/requests/search?query=${query}`
      );
      setRequests(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to search requests");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue?.trim()) {
      fetchSearchedRequests(debounceSearchValue);
    } else {
      fetchRequests();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

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

  return (
    <div>
      <PageLayout
        pages={pages}
        func={() => navigate("/products/create")}
        fetch={fetchRequests}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonName={"Create product"}
        columns={column}
        data={requests}
        setError={setError}
        endpoint={"requests"}
        loading={loading}
        pagination={true}
        isActions={false}
      />
    </div>
  );
};

export default RequestsPage;
