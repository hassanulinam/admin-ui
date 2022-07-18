import { createContext, useContext, useState } from "react";
import { Person, TypeDataContext } from "../customTypes";

const DataContext = createContext<TypeDataContext>({
  data: [],
  setData: () => {},
  deleteRow: (rowId) => {},
  isSelectedAll: false,
  setIsSelectedAll: () => {},
  searchResults: [],
  setSearchResults: () => {},
  selectedRows: [],
  setSelectedRows: () => {},
  page: 1,
  setPage: () => {},
  deleteMultipleRows: () => {},
  getRowsOnPage: () => [],
});

const DataContextProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<Person[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [searchResults, setSearchResults] = useState([...data]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const getRowsOnPage = () => searchResults.slice((page - 1) * 10, page * 10);

  const adjustPagesAfterDeletion = () => {
    if (getRowsOnPage().length === 0) setPage(page - 1 || 1);
    console.log("Changing Active page...", page);
  };

  const deleteRow = (rowId: string) => {
    setSearchResults(searchResults.filter((p) => p.id !== rowId));
    setData(data.filter((p) => p.id !== rowId));
    adjustPagesAfterDeletion();
  };

  const deleteMultipleRows = () => {
    setSearchResults(searchResults.filter((p) => !selectedRows.includes(p.id)));
    setData(data.filter((p) => !selectedRows.includes(p.id)));
    setSelectedRows([]); // clear the selection states after deletion.
    setIsSelectedAll(false);
    adjustPagesAfterDeletion();
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        searchResults,
        setSearchResults,
        deleteRow,
        isSelectedAll,
        setIsSelectedAll,
        selectedRows,
        setSelectedRows,
        page,
        setPage,
        deleteMultipleRows,
        getRowsOnPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const DataState = () => useContext(DataContext);
