import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import UseDebounce from "../hooks/UseDebounce";

const UsersPage = () => {
  const pages = ["Users", ">", "List"];
  const [users, setUsers] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = UseDebounce(searchQuery, 800);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/users?populate=*`);
      setUsers(response.data || "error");
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Products";
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSearchedUsers = async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/users`);
      setUsers(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message || "Failed to search users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debounceSearchValue?.trim()) {
      fetchSearchedUsers(debounceSearchValue);
    } else {
      fetchUsers();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  const column = [
    {
      header: "Username",
      accessor: (item) => item.username,
      nowrap: true,
    },
    {
      header: "Profile",
      accessor: (item) => item?.profilePicture?.url,
      type: "image",
    },
    {
      header: "Email",
      accessor: (item) => item.email,
    },
    {
      header: "Phone number",
      accessor: (item) => item?.telephoneNumber,
    },
    {
      header: "Likes",
      accessor: (item) => item?.likes?.length || "0",
      nowrap: true,
      type: "likes",
    },
    {
      header: "Requests",
      accessor: (item) => item?.requests?.length || "0",
      type: "req",
    },
  ];

  return (
    <div>
      <PageLayout
        pages={pages}
        fetch={fetchUsers}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        buttonName={"user"}
        columns={column}
        data={users}
        setError={setError}
        endpoint={"users"}
        loading={loading}
        pagination={true}
        isActions={false}
      />
    </div>
  );
};

export default UsersPage;
