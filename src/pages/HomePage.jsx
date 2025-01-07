import React, { useEffect, useState } from "react";
import { assets } from "../assets/Assets";
import NotificationBox from "../components/text/NotificationBox";
import WelcomeBox from "../components/text/WelcomeBox";
import SpinMachine from "../components/SpinMachine";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import axios from "axios";
import { baseUrl } from "../Constant";

const HomePage = ({ profile }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const imageProfile = profile?.profilePicture?.url;
  const [newRequest, setNewRequest] = useState({});

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
    <div className="justify-center h-screen bg-hitam text-putih mb-36">
      <div className="px-12 pt-10 ">
        <div className="text-white text-3xl font-bold">Dashboard</div>
        <div className="mt-6 flex flex-col md:flex-row lg:flex-row gap-8">
          <WelcomeBox
            imageProfile={
              profile.profilePicture ? imageProfile : assets.photo_profile
            }
          />
          <NotificationBox newRequest={newRequest} />
        </div>
        <div className="pt-32 ">
          <SpinMachine />
          {/* <RollingMachine /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
