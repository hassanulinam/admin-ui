import React, { createContext, useContext, useState } from "react";
import { Person } from "../customTypes";

type TypeDataContext = {
  data: Person[];
  setData: React.Dispatch<React.SetStateAction<Person[]>>;
  deleteRow: (rowId: string) => void;
};

const DataContext = createContext<TypeDataContext>({
  data: [],
  setData: () => {},
  deleteRow: (rowId) => {},
});

const DataContextProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<Person[]>([]);

  const deleteRow = (rowId: string) => {
    setData(data.filter((p) => p.id !== rowId));
  };

  return (
    <DataContext.Provider value={{ data, setData, deleteRow }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const DataState = () => useContext(DataContext);
