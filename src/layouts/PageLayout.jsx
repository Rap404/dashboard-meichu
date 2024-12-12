import React, { useState } from "react";
import RegularButton from "../components/buttons/RegularButton";
import EmptyList from "../components/table/EmptyList";
import TableComponent from "../components/table/TableComponent";
import { AiOutlineLoading } from "react-icons/ai";
import MiniModal from "../components/modal/MiniModal";
import { useAuth } from "../lib/AuthContext";
import { baseUrl } from "../Constant";
import { successNotif } from "../components/text/Notification";
import axios from "axios";

const PageLayout = ({
  pages,
  func,
  buttonName,
  columns,
  data,
  setError,
  endpoint,
  fetch,
  onSearch,
  pagination,
  loading,
  isActions = true,
}) => {
  const { getToken } = useAuth();
  const token = getToken();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleSelectAll = (selectedIds) => {
    setSelectedIds(selectedIds);
  };

  const handleRowSelect = (selectedIds) => {
    setSelectedIds(selectedIds);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${baseUrl}/${endpoint}/${selectedId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetch();

      successNotif("Successfully deleted item");
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  const handleMultipleDelete = async () => {
    try {
      await Promise.all(
        selectedIds.map((id) =>
          axios.delete(`${baseUrl}/${endpoint}/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
        )
      );

      fetch();

      successNotif(`Deleted ${selectedIds.length} items Successfully`);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-hitam overflow-x-hidden overscroll-none">
      <div className="ps-5 md:ps-6 lg:px-10 lg:ps-12 py-10 min-h-screen w-full bg-hitam">
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
          <div className="overflow-x-auto">
            {modalOpen ? (
              <MiniModal
                closeModal={() => setModalOpen(false)}
                func={() => handleDelete()}
              />
            ) : (
              ""
            )}
            {data === undefined || data.length === 0 ? (
              <EmptyList page={pages[0]} />
            ) : (
              <TableComponent
                columns={columns}
                data={data}
                onSearch={onSearch}
                onRowSelect={handleRowSelect}
                onSelectAll={handleSelectAll}
                setSelectedId={setSelectedId}
                multiDelFunc={handleMultipleDelete}
                setModalOpen={setModalOpen}
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
