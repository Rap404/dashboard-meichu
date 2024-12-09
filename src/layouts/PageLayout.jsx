import React from "react";
import RegularButton from "../components/buttons/RegularButton";
import TableList from "../components/table/TableList";
import EmptyList from "../components/table/EmptyList";
import TableComponent from "../components/table/TableComponent";
import { AiOutlineLoading } from "react-icons/ai";

const PageLayout = ({
  pages,
  func,
  buttonName,
  columns,
  data,
  onSearch,
  onRowSelect,
  onSelectAll,
  actions,
  pagination,
  loading,
  isActions = true,
}) => {
  return (
    <div className="min-h-screen w-full bg-hitam overflow-x-hidden overscroll-none">
      <div className="ps-12 py-10 min-h-screen w-full bg-hitam">
        <div className="w-full">
          <div className="flex flex-row gap-4 text-sm text-zinc-400">
            {pages.map((page, index) => (
              <span key={index}>{page}</span>
            ))}
          </div>
          <div className="flex flex-row justify-between my-2">
            <div className="text-white text-3xl font-bold">{pages[0]}</div>
            <div className="px-8">
              {isActions ? <RegularButton func={func} name={buttonName} /> : ""}
            </div>
          </div>
        </div>
        {loading === true ? (
          <div className="min-h-screen">
            <AiOutlineLoading className="text-red-200 animate-spin w-10 h-10 mr-3" />
          </div>
        ) : (
          <div className="">
            {data === undefined ? (
              <TableList />
            ) : (
              <TableComponent
                columns={columns}
                data={data}
                onSearch={onSearch}
                onRowSelect={onRowSelect}
                onSelectAll={onSelectAll}
                actions={actions}
                pagination={pagination}
                isActions={isActions}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageLayout;
