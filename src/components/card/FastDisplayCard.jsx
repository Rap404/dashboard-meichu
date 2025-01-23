import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../Constant";
import LoadingComponent from "../text/Loading";

const FastDisplayCard = ({ endpoint, title, setError, icon }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/${endpoint}`);
      setData(response?.data?.data || response.data || []);
      setError(null);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return (
    <>
      <div className="flex flex-col gap-5 border border-2-abutua dark:border-secondary rounded-md dark:bg-secondary w-full py-5">
        <div className="flex w-full items-center justify-center">
          <span className="text-lg dark:text-white">Total {title}</span>
        </div>
        <div className="flex flex-row gap-5 py-2 px-2 dark:text-white justify-center items-center">
          <span className="size-10">{icon}</span>
          <span>
            {loading ? "Load..." : data.length} {title}
          </span>
        </div>
      </div>
    </>
  );
};

export default FastDisplayCard;
