import React, { useEffect, useState } from "react";
import { adminProfileForm, baseUrl } from "../Constant";
import FormLayout from "../layouts/FormLayout";
import { handleChange } from "../lib/FormHandler";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import { errorNotif } from "../components/text/Notification";
import { formatDateTime } from "../lib/DateFormatter";

const AdminProfilePage = () => {
  const { user } = useAuth();
  const id = user.id;
  const pages = ["Profile", ">", "Edit"];
  const [formData, setFormData] = useState({
    profilePicture: null,
    username: "",
    email: "",
    createdAt: "",
  });
  const [avatar, setAvatar] = useState(formData.profilePicture);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAvatar = (img) => {
    setAvatar(img);
    setFormData((prev) => ({
      ...prev,
      profilePicture: img,
    }));
  };

  console.log("avatar", formData);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/users/${id}?populate=profilePicture`
      );
      const profileData = response.data;
      setFormData({
        profilePicture: profileData.profilePicture.url || null,
        username: profileData.username || "",
        email: profileData.email,
        createdAt: formatDateTime(profileData.createdAt),
      });
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message) || "Failed fetch Profile";
    } finally {
      setLoading(false);
    }
  };

  // const handleUpdateProfile = async () => {
  //   try {
  //     setLoading(true);
  //     const formPayload = new FormData();
  //     if (formData.profilePicture)
  //   } catch (error) {}
  // };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="">Loading...</div>;
  if (error) return errorNotif(error.message);

  return (
    <>
      <FormLayout
        formData={adminProfileForm}
        pages={pages}
        isUseButton={false}
        changeHandler={(e) => handleChange(e, setFormData)}
        fileHandler={handleAvatar}
        file={avatar}
        data={formData}
      />
    </>
  );
};

export default AdminProfilePage;
