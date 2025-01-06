import React from "react";
import { mediaUrl } from "../../Constant";
import { PhotoIcon } from "@heroicons/react/24/outline";

const TableColumn = ({ item, data }) => {
  const renderColumn = () => {
    if (!item || !data) return null;

    switch (item.type) {
      case "image":
        try {
          const imageUrl = item.accessor(data);
          return (
            <div className="flex justify-center">
              <img
                src={imageUrl}
                className="max-h-20 max-w-20 object-cover "
                alt={data.attributes?.name || "image"}
              />
            </div>
          );
          s;
        } catch (error) {
          console.error("Error rendering image:", error);
          return <div className="text-white">Image Not Alvailable</div>;
        }
      case "bool":
        try {
          const type = item.accessor(data);
          if (type === false) {
            return <div className="">Imvu+</div>;
          } else {
            return <div className="">Non imvu</div>;
          }
        } catch (error) {
          console.error("Error rendering image:", error);
          return <div className="text-red-500">Data Not Alvailable</div>;
        }

      case "price":
        try {
          const price = item.accessor(data);
          return (
            <div className="">
              <span>${price}</span>
            </div>
          );
        } catch (error) {
          console.error("Error rendering image:", error);
          return <div className="text-red-500">Data Not Alvailable</div>;
        }

      case "files":
        try {
          const fileCount = item.accessor(data);
          return (
            <div className="flex justify-center items-center gap-2">
              <div className="bg-secondary p-1 rounded-sm">{fileCount}</div>
              <span className="w-5 h-5 text-white">
                <PhotoIcon />
              </span>
            </div>
          );
        } catch (error) {
          console.error("Error rendering files:", error);
          return <div className="text-red-500">Files not Alvailable</div>;
        }

      case "req":
        try {
          const fileCount = item.accessor(data);
          return (
            <div className="flex justify-center items-center gap-2">
              <div className="">{fileCount}</div>
              <span>Requests</span>
            </div>
          );
        } catch (error) {
          console.error("Error rendering files:", error);
          return <div className="text-red-500">Requests not Alvailable</div>;
        }

      case "pro":
        try {
          const products = item.accessor(data);
          return (
            <div className="flex justify-center items-center gap-2">
              <div className="bg-abumuda p-1 rounded-sm">{products}</div>
              <span>Products</span>
            </div>
          );
        } catch (error) {
          console.error("Error rendering files:", error);
          return <div className="text-red-500">Requests not Alvailable</div>;
        }

      case "date":
        try {
          const dateValue = item.accessor(data);

          const defaultOptions = {
            // Opsi tanggal
            year: "numeric",
            month: "numeric",
            day: "numeric",

            // Opsi waktu
            hour: "2-digit",
            minute: "2-digit",

            // Tambahan opsi regional
            hour12: false,
            timeZone: "UTC",
          };

          // gabungkan default dengan opsi kustom
          const formatOptions = {
            ...defaultOptions,
            ...item.dateFormat,
          };

          const parsedDate = new Date(dateValue);

          if (!isNaN(parsedDate.getTime())) {
            // Format lengkap
            const fullFormattedDate = parsedDate.toLocaleDateString(
              "id-ID",
              formatOptions
            );

            return (
              <div className="flex flex-col">
                <span className="font-medium">
                  {parsedDate.toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-sm text-gray-500">
                  {parsedDate.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
            );
          } else {
            return <span>{dateValue}</span>;
          }
        } catch (error) {
          console.error("Error rendering date:", error);
          return <div className="text-red-500">Files not Alvailable</div>;
        }

      case "notif":
        const isNew = item.accessor(data);
        try {
          if (isNew === true) {
            return (
              <div className="text-white">
                <span className="bg-red-500 rounded-md p-1">New</span>
              </div>
            );
          } else {
            return "";
          }
        } catch (error) {
          console.error("Error rendering date:", error);
          return <div className="text-red-500">Notif not Alvailable</div>;
        }

      case "likes":
        try {
          const likeCount = item.accessor(data);
          return (
            <div className="flex items-center justify-center gap-2">
              <span>{likeCount}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          );
        } catch (error) {
          console.error("Error rendering likes:", error);
          return <div className="text-red-500">Likes Not Available</div>;
        }

      default:
        try {
          return item.accessor ? item.accessor(data) : data[item.key];
        } catch (error) {
          console.error("Error rendering default column:", error);
          return <div className="text-gray-500">N/A</div>;
        }
    }
  };

  return <div>{renderColumn(item)}</div>;
};

export default TableColumn;
