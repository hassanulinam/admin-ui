import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Person } from "../customTypes";
import { DataState } from "../context/DataContextProvider";
import PersonRow from "./PersonRow";

const AdminView = () => {
  const { data, setData } = DataState();

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([...data].slice(0, 10));
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const editRow = (rowId: string) => {};
  const deleteRow = (rowId: string) => {
    setData(data.filter((p) => p.id !== rowId));
  };
  const selectRow = (rowId: string) => {
    setSelectedRows([...selectedRows, rowId]);
  };
  const unSelectRow = (rowId: string) => {
    setSelectedRows(selectedRows.filter((id) => id !== rowId));
  };
  const deleteMultipleRows = () => {
    setData(data.filter((p) => !selectedRows.includes(p.id)));
    setSelectedRows([]); // clear the selection states after deletion.
    setIsSelectedAll(false);
  };

  useEffect(() => {
    setSearchResults(
      data
        .filter((p) =>
          Object.values(p).some((k) =>
            k.toLowerCase().includes(searchInput.toLowerCase())
          )
        )
        .slice(0, 10)
    );
  }, [searchInput, data]);

  useEffect(() => {
    if (isSelectedAll) setSelectedRows(searchResults.map((p) => p.id));
  }, [isSelectedAll]); // selecting all rows...

  return (
    <div>
      <input
        type="search"
        className="search-box"
        value={searchInput}
        onChange={(e: any) => setSearchInput(e.target.value)}
      />
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
          {searchResults.map((p) => (
            <PersonRow
              key={p.id}
              pdata={p}
              onEdit={editRow}
              onDelete={deleteRow}
              isSelectedAll={isSelectedAll}
              onSelect={selectRow}
              onUnSelect={unSelectRow}
            />
          ))}
        </tbody>
      </Table>
      <Button variant="danger" onClick={deleteMultipleRows}>
        Delete Selected
      </Button>
    </div>
  );
};

export default AdminView;
