import React, { useEffect, useState } from "react";
import { assets } from "../assets/Assets";
import NotificationBox from "../components/text/NotificationBox";
import WelcomeBox from "../components/text/WelcomeBox";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import axios from "axios";
import { baseUrl } from "../Constant";
import { useAuth } from "../lib/AuthContext";
import FastDisplayCard from "../components/card/FastDisplayCard";
import {
  PencilSquareIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import CardShuffler from "../components/CardShuffler";

const HomePage = ({ profile }) => {
  const { token } = useAuth();
  const imageProfile = profile?.profilePicture?.url;
  const [newRequest, setNewRequest] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNewRequest = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseUrl}/requests?filters[isNew]=true`
      );
      setNewRequest(response.data.data || []);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewRequest();
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return errorNotif(error);

  return (
    <div className="justify-center h-screen bg-white dark:bg-hitam text-hitam dark:text-white mb-36 overflow-auto pb-20">
      <div className="px-12 pt-10 ">
        <div className="text-hitam dark:text-white text-3xl font-bold">
          Dashboard
        </div>
        <div className="mt-6 flex flex-col md:flex-row lg:flex-row gap-8">
          <WelcomeBox
            imageProfile={
              profile.profilePicture ? imageProfile : assets.photo_profile
            }
          />
          <NotificationBox newRequest={newRequest} />
        </div>
        <div className="flex flex-col md:flex-row lg:flex-row gap-10 mt-20">
          <FastDisplayCard
            endpoint={"products"}
            title={"Products"}
            setLoading={setLoading}
            setError={setError}
            icon={<PencilSquareIcon />}
          />
          <FastDisplayCard
            endpoint={"ambassadors"}
            title={"Ambassadors"}
            setLoading={setLoading}
            setError={setError}
            icon={<UserGroupIcon />}
          />
          <FastDisplayCard
            endpoint={"users"}
            title={"Users"}
            setLoading={setLoading}
            setError={setError}
            icon={<UserCircleIcon />}
          />
        </div>
        <div className="mt-20">
          <CardShuffler />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
