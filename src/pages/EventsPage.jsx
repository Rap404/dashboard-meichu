import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useNavigate } from "react-router-dom";
import UseDebounce from "../hooks/UseDebounce";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";

const EventsPage = () => {
  const pages = ["Events", ">", "List"];
  const navigate = useNavigate();
  const [events, setEvents] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = UseDebounce(searchQuery, 800);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/events`);
      setEvents(response.data.data || []);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch events";
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedEvents = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/events/search?query=${query}`
      );
      setEvents(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to search events");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue?.trim()) {
      fetchSearchedEvents(debounceSearchValue);
    } else {
      fetchEvents();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    fetchEvents();
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

  return (
    <div>
      <PageLayout
        pages={pages}
        func={() => navigate("/events/create")}
        fetch={fetchEvents}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
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
