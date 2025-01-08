import React, { useEffect, useRef, useState } from "react";
import { adminProfileForm, baseUrl, mediaUrl } from "../Constant";
import FormLayout from "../layouts/FormLayout";
import { handleChange } from "../lib/FormHandler";
import axios from "axios";
import { useAuth } from "../lib/AuthContext";
import { errorNotif, successNotif } from "../components/text/Notification";
import { formatDateTime } from "../lib/DateFormatter";
import { useNavigate } from "react-router-dom";
import MiniModal from "../components/modal/MiniModal";

const AdminProfilePage = () => {
  const { user, token, logout } = useAuth();
  const id = user.id;
  const pages = ["Profile", ">", "Edit"];
  const [formData, setFormData] = useState({
    profilePicture: null,
    username: "",
    email: "",
    createdAt: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
      errorNotif(error.message);
    }
  };

  const handleAvatar = (img) => {
    try {
      if (img instanceof File || img instanceof Blob) {
        const objectUrl = URL.createObjectURL(img);
        setAvatar(objectUrl);
        setFormData((prev) => ({
          ...prev,
          profilePicture: img,
        }));

        return () => URL.revokeObjectURL(objectUrl);
      } else if (typeof img === "string") {
        const finalUrl = img.startsWith("/uploads") ? `${mediaUrl}${img}` : img;

        setAvatar(finalUrl);
        setFormData((prev) => ({
          ...prev,
          profilePicture: finalUrl,
        }));
      } else {
        setAvatar(null);
        setFormData((prev) => ({
          ...prev,
          profilePicture: null,
        }));
      }
    } catch (error) {
      console.error("Error handling avatar:", error);
      setAvatar(null);
      setFormData((prev) => ({
        ...prev,
        profilePicture: null,
      }));
    }
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/users/${id}?populate=*`);
      const profileData = response.data;

      setFormData({
        username: profileData.username,
        email: profileData.email,
        createdAt: formatDateTime(profileData.createdAt),
      });

      if (profileData?.profilePicture !== null) {
        handleAvatar(profileData?.profilePicture?.url);
      }

      setError(null);
    } catch (error) {
      setError(error.response?.data?.message) || "Failed fetch Profile";
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const payload = {
        username: formData.username,
      };

      if (
        formData.profilePicture instanceof File ||
        formData.profilePicture instanceof Blob
      ) {
        const filePayload = new FormData();
        filePayload.append("files", formData.profilePicture, "profilePicture");

        const fileUploadResponse = await axios.post(
          `${baseUrl}/upload`,
          filePayload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const uploadedFileId = fileUploadResponse.data[0].id;

        payload.profilePicture = uploadedFileId;
      }

      const response = await axios.put(`${baseUrl}/users/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setFormData({
        profilePicture: response.data.profilePicture?.url || null,
        username: response.data.username || "",
        email: response.data.email,
        createdAt: formatDateTime(response.data.createdAt),
      });

      handleAvatar(formData.profilePicture || null);

      successNotif("Profile updated succesfully");
    } catch (error) {
      console.error("Update profile error", error);
      errorNotif(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <div className="">Loading...</div>;
  if (error) return errorNotif(error.message);

  return (
    <>
      <FormLayout
        formConstant={adminProfileForm}
        key={avatar}
        pages={pages}
        changeHandler={(e) => handleChange(e, setFormData)}
        fileHandler={handleAvatar}
        file={avatar}
        formData={formData}
        mainFunc={handleUpdateProfile}
        scFunc={() => setModalOpen(!modalOpen)}
        buttonName={loading ? "Updating.." : "Update Profile"}
        scButtonName={"Logout"}
      />
      {modalOpen && (
        <MiniModal
          closeModal={() => setModalOpen(false)}
          func={() => handleLogout}
          text={"you want to log out?"}
          isText={false}
          buttonName="Log out"
        />
      )}
    </>
  );
};

export default AdminProfilePage;
