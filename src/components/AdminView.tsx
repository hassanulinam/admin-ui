import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DataState } from "../context/DataContextProvider";
import CustomPagiation from "./CustomPagination";
import PersonRow from "./PersonRow";

const AdminView = () => {
  const {
    data,
    setData,
    isSelectedAll,
    setIsSelectedAll,
    searchResults,
    setSearchResults,
  } = DataState();

  const [searchInput, setSearchInput] = useState("");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [activePgNo, setActivePgNo] = useState(1);

  const editRow = (rowId: string) => {};

  const selectRow = (rowId: string) => {
    setSelectedRows([...selectedRows, rowId]);
  };
  const unSelectRow = (rowId: string) => {
    setSelectedRows(selectedRows.filter((id) => id !== rowId));
  };

  const rowsExistInPage = () =>
    searchResults.slice((activePgNo - 1) * 10, activePgNo * 10).length > 0;

  const deleteMultipleRows = () => {
    setData(data.filter((p) => !selectedRows.includes(p.id)));
    setSearchResults(searchResults.filter((p) => !selectedRows.includes(p.id)));
    if (!rowsExistInPage())
      setActivePgNo(activePgNo - 1 > 0 ? activePgNo - 1 : 1);
    setSelectedRows([]); // clear the selection states after deletion.
    setIsSelectedAll(false);
  };

  const handleSearch = () => {
    setSearchResults(
      data.filter((p) =>
        Object.values(p).some((k) =>
          k.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    );
    setActivePgNo(1);
  };

  useEffect(() => {
    if (isSelectedAll)
      setSelectedRows(
        searchResults
          .slice((activePgNo - 1) * 10, activePgNo * 10)
          .map((p) => p.id)
      );
    else setSelectedRows([]);
  }, [isSelectedAll]); // selecting all rows...

  return (
    <div>
      <input
        type="search"
        className="search-box"
        value={searchInput}
        onChange={(e: any) => setSearchInput(e.target.value)}
        onKeyDown={(e: any) => e.key === "Enter" && handleSearch()}
      />
      <div className="persons-table">
        <Table striped>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  className="row-checkbox"
                  checked={isSelectedAll}
                  onChange={() => setIsSelectedAll(!isSelectedAll)}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ width: "100%" }}>
            {searchResults
              .slice((activePgNo - 1) * 10, activePgNo * 10)
              .map((p) => (
                <PersonRow
                  key={p.id}
                  pdata={p}
                  onEdit={editRow}
                  onSelect={selectRow}
                  onUnSelect={unSelectRow}
                />
              ))}
          </tbody>
        </Table>
      </div>
      <CustomPagiation
        activePgNo={activePgNo}
        setActivePgNo={setActivePgNo}
        totalLength={searchResults.length}
      />
      <Button variant="danger" onClick={deleteMultipleRows}>
        Delete Selected
      </Button>
    </div>
  );
};

export default AdminView;
