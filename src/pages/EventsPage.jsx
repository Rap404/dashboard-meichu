import React from "react";
import PageLayout from "../layouts/PageLayout";

const EventsPage = () => {
  const pages = ["Events", ">", "List"];
  return (
    <div>
      <PageLayout pages={pages} nav={"/events/create"} buttonName={"event"} />
    </div>
  );
};

export default EventsPage;
