// src/layouts/BasicLayout.js
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { baseUrl, mediaUrl } from "../Constant";
import { useAuth } from "../lib/AuthContext";
import axios from "axios";
import { assets } from "../assets/Assets";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";

const BasicLayout = ({ children, setUserProfile }) => {
  const { user } = useAuth();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const profileImage = profile?.profilePicture?.url;
  const id = user.id;

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/users/${id}?populate=profilePicture`
      );
      const profileData = response.data;
      setProfile(profileData);
      setUserProfile(profileData);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message) || "Failed fetch Profile";
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [setUserProfile]);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error.message);

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <Navbar
        toggleSidebar={toggleSidebar}
        isSideBarOpen={isSideBarOpen}
        image={
          profile.profilePicture?.url ? profileImage : assets.photo_profile
        }
      />
      <div className="flex flex-grow">
        <Sidebar setIsOpen={toggleSidebar} isOpen={isSideBarOpen} />
        <main className="flex-grow overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BasicLayout;
