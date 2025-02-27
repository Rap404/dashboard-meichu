import React, { useState } from "react";

const TextArea = ({
  id,
  name,
  placeholder = "Ketik pesan anda...",
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  maxLength,
  rows = 4,
}) => {
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    setCharCount(newValue.length);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div className="w-full mt-1">
      <div className="relative z-0">
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          maxLength={maxLength || 0}
          rows={rows}
          placeholder={placeholder}
          className={`
            w-full
            px-3
            py-2
            dark:text-white
            border-2
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-oren
            focus:border-transparent
            min-h-[100px]
            transition
            duration-200
            resize-y
            bg-white
            dark:bg-secondary
            ${disabled ? "bg-abumuda cursor-not-allowed" : ""}
            ${error ? "border-red-500" : "dark:border-abumuda"}
            ${error ? "focus:ring-red-500" : "focus:ring-oren"}
            hover:shadow-md
            `}
        />

        {/* Resize handle indicator - now points only downward */}
        <div className="absolute bottom-0 right-0 w-4 h-4 cursor-ns-resize pointer-events-none">
          <svg
            className="w-full h-full text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M12 12L12 16M12 16L9 13M12 16L15 13"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {value?.length}/{maxLength}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
