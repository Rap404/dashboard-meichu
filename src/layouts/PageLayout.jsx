import React from "react";
import RegularButton from "../components/buttons/RegularButton";
import TableList from "../components/table/TableList";
import EmptyList from "../components/table/EmptyList";

const PageLayout = ({ List, pages, nav, buttonName }) => {
  return (
    <div className="ps-12 pt-10 min-h-screen bg-hitam">
      <div className="w-full">
        <div className="flex flex-row gap-4 text-sm text-zinc-400">
          {pages.map((page, index) => (
            <span key={index}>{page}</span>
          ))}
        </div>
        <div className="flex flex-row justify-between my-2">
          <div className="text-white text-3xl font-bold">{pages[0]}</div>
          <div className="px-8">
            <RegularButton nav={nav} name={buttonName} />
          </div>
        </div>
      </div>
      <div className="">
        <TableList />
        {/* {List === undefined ? <EmptyList /> : <TableList />} */}
      </div>
    </div>
  );
};

export default PageLayout;
