import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const pages = ["Events", ">", "List"];
  const navigate = useNavigate();
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/events`);
      setEvents(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Events";
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
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
      header: "Image",
      accessor: (item) => item.attributes?.image_cover?.data?.attributes?.url,
      nowrap: true,
      type: "image",
    },
    {
      header: "Description",
      accessor: (item) => item.attributes.description,
      nowrap: true,
    },
    {
      header: "Start Date",
      accessor: (item) => item.attributes.start_date,
      type: "date",
    },
    {
      header: "End Date",
      accessor: (item) => item.attributes.end_date,
      type: "date",
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
        func={() => navigate("/events/create")}
        fetch={fetchEvents}
        buttonName={"Create event"}
        columns={columns}
        data={events}
        setError={setError}
        endpoint={"events"}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default EventsPage;
