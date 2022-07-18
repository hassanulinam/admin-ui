import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { DataState } from "../context/DataContextProvider";
import CustomPagiation from "./CustomPagination";
import PersonRow from "./PersonRow";

const AdminView = () => {
  const {
    data,
    isSelectedAll,
    setIsSelectedAll,
    getRowsOnPage,
    setSearchResults,
    selectedRows,
    setSelectedRows,
    setPage,
    deleteMultipleRows,
  } = DataState();

  const [searchInput, setSearchInput] = useState("");

  const editRow = (rowId: string) => {};

  const selectRow = (rowId: string) => {
    setSelectedRows([...selectedRows, rowId]);
  };
  const unSelectRow = (rowId: string) => {
    setSelectedRows(selectedRows.filter((id) => id !== rowId));
  };

  const handleSearch = () => {
    setSearchResults(
      data.filter((p) =>
        Object.values(p).some((k) =>
          k.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    );
    setPage(1);
  };

  useEffect(() => {
    if (isSelectedAll) setSelectedRows(getRowsOnPage().map((p) => p.id));
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
            {getRowsOnPage().map((p) => (
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
      <CustomPagiation />
      <Button variant="danger" onClick={deleteMultipleRows}>
        Delete Selected
      </Button>
    </div>
  );
};

export default AdminView;
