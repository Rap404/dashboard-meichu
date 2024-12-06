export const formatDateTime = (dateTimeString) => {
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
