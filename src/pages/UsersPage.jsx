import React, { useEffect, useState } from "react";
import PageLayout from "../layouts/PageLayout";
import axios from "axios";
import { baseUrl } from "../Constant";

const UsersPage = () => {
  const pages = ["Users", ">", "List"];
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/users?populate=requests,likes,profilePicture`
      );
      setUsers(response.data || "error");
      // console.log(users[0].likes.length);
      setError(null);
    } catch (error) {
      setError(error.message) || "Failed fetch Products";
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const column = [
    {
      header: "Username",
      accessor: (item) => item.username,
      nowrap: true,
    },
    {
      header: "Profile",
      accessor: (item) => item.profilePicture.url,
      type: "image",
    },
    {
      header: "Email",
      accessor: (item) => item.email,
    },
    {
      header: "Likes",
      accessor: (item) => item.likes.length,
      nowrap: true,
      type: "likes",
    },
    {
      header: "Requests",
      accessor: (item) => item.requests.length,
      type: "req",
    },
  ];

  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  const handleSelectAll = (selectedIds) => {
    console.log("Selected all:", selectedIds);
  };

  const handleRowSelect = (selectedIds) => {
    console.log("selected rows:", selectedIds);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <PageLayout
        pages={pages}
        nav={"/users/create"}
        buttonName={"user"}
        columns={column}
        data={users}
        onSearch={handleSearch}
        onSelectAll={handleSelectAll}
        onRowSelect={handleRowSelect}
        loading={loading}
        pagination={true}
      />
    </div>
  );
};

export default UsersPage;
