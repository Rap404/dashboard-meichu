import React, { useState } from "react";

const DateInput = () => {
  const [dateTime, setDateTime] = useState("");

  // Format datetime untuk tampilan yang lebih user-friendly
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const date = new Date(dateTimeString);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <div className="w-full py-1">
      <div className="space-y-2 items-center justify-between flex flex-row">
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full px-3 py-2 border border-abumuda rounded-md focus:outline-none focus:ring-2 focus:ring-oren focus:border-oren bg-secondary text-abumuda"
        />
      </div>

      {/* Preview hasil */}
      {dateTime && (
        <div className="mt-2 p-2">
          <p className="text-sm text-gray-600">
            Waktu yang dipilih: {formatDateTime(dateTime)}
          </p>
        </div>
      )}
    </div>
  );
};

export default DateInput;
