import React, { createContext, useContext, useState } from "react";
import { Person } from "../customTypes";

type TypeDataContext = {
  data: Person[];
  setData: React.Dispatch<React.SetStateAction<Person[]>>;
};

const DataContext = createContext<TypeDataContext>({
  data: [],
  setData: () => {},
});

const DataContextProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<Person[]>([]);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;

export const DataState = () => useContext(DataContext);
