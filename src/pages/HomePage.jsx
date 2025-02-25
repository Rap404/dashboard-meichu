import React, { useEffect, useState } from "react";
import { assets } from "../assets/Assets";
import NotificationBox from "../components/text/NotificationBox";
import WelcomeBox from "../components/text/WelcomeBox";
import LoadingComponent from "../components/text/Loading";
import { errorNotif } from "../components/text/Notification";
import axios from "axios";
import { baseUrl } from "../Constant";
import FastDisplayCard from "../components/card/FastDisplayCard";
import {
  PencilSquareIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import GachaPage from "../components/GachaMachine";

const HomePage = ({ profile }) => {
  const imageProfile = profile?.profilePicture?.url;
  const [items, setItems] = useState([]);
  const [newRequest, setNewRequest] = useState({});
  const [rigged, setRigged] = useState(false);
  const [winningItemIndex, setWinningItemIndex] = useState(null);
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

  const renderControls = () => {
    return (
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rigged}
            onChange={(e) => setRigged(e.target.checked)}
            className="form-checkbox h-4 w-4"
          />
          <label className="text-sm text-gray-700 dark:text-gray-300">
            Set Winning Item
          </label>
        </div>

        {rigged && (
          <select
            value={winningItemIndex || ""}
            onChange={(e) => setWinningItemIndex(Number(e.target.value))}
            className="form-select mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
          >
            {winningItemIndex === null && (
              <option value="">Select winning item</option>
            )}
            {items.map((item, index) => (
              <option key={index} value={index}>
                {item.emoticon} {item.name}
              </option>
            ))}
          </select>
        )}
      </div>
    );
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
          <GachaPage
            items={items}
            setItems={setItems}
            rigged={rigged}
            winningItemIndex={winningItemIndex}
            setWinningItemIndex={setWinningItemIndex}
          />
          <div className="">{renderControls()}</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
