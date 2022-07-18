import React, { createContext, useContext, useState } from "react";
import { Person } from "../customTypes";

type TypeDataContext = {
  data: Person[];
  setData: React.Dispatch<React.SetStateAction<Person[]>>;
  deleteRow: (rowId: string) => void;
  isSelectedAll: boolean;
  setIsSelectedAll: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: Person[];
  setSearchResults: React.Dispatch<React.SetStateAction<Person[]>>;
};

const DataContext = createContext<TypeDataContext>({
  data: [],
  setData: () => {},
  deleteRow: (rowId) => {},
  isSelectedAll: false,
  setIsSelectedAll: () => {},
  searchResults: [],
  setSearchResults: () => {},
});

const DataContextProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<Person[]>([]);
  const [isSelectedAll, setIsSelectedAll] = useState(false);
  const [searchResults, setSearchResults] = useState([...data]);

  const deleteRow = (rowId: string) => {
    setData(data.filter((p) => p.id !== rowId));
    setSearchResults(searchResults.filter((p) => p.id !== rowId));
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const DataState = () => useContext(DataContext);
