import React, { useState } from "react";
import { formatDateTime } from "../../lib/DateFormatter";

const DateInput = () => {
  const [dateTime, setDateTime] = useState("");

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
