import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import UseDebounce from "../hooks/UseDebounce";

const AmbassadorPage = () => {
  const pages = ["Ambassadors", ">", "List"];
  const navigate = useNavigate();
  const [ambassadors, setAmbassadors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = UseDebounce(searchQuery, 800);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAmbassadors = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/ambassadors`);
      setAmbassadors(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Ambassadors";
      setAmbassadors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedAmbassadors = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/ambassadors/search?query=${query}`
      );
      setAmbassadors(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to search Ambassadors");
      setAmbassadors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue?.trim()) {
      fetchSearchedAmbassadors(debounceSearchValue);
    } else {
      fetchAmbassadors();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    fetchAmbassadors();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  const columns = [
    {
      header: "Nama",
      accessor: (item) => item.attributes.name,
      nowrap: true,
    },
    {
      header: "image",
      accessor: (item) => item?.attributes?.image?.data?.attributes?.url,
      nowrap: true,
      type: "image",
    },
    {
      header: "Deskripsi",
      accessor: (item) => item.attributes.description,
      nowrap: true,
    },
  ];

  return (
    <div className="">
      <PageLayout
        pages={pages}
        func={() => navigate("/ambassadors/create")}
        fetch={fetchAmbassadors}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonName={"Create ambassadors"}
        columns={columns}
        data={ambassadors}
        setError={setError}
        endpoint={"ambassadors"}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default AmbassadorPage;
