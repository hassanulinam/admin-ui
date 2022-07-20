export type Person = {
  email: string;
  id: string;
  name: string;
  role: string;
};

export type TypeDataContext = {
  data: Person[];
  setData: React.Dispatch<React.SetStateAction<Person[]>>;
  deleteRow: (rowId: string) => void;
  isSelectedAll: boolean;
  setIsSelectedAll: React.Dispatch<React.SetStateAction<boolean>>;
  searchResults: Person[];
  setSearchResults: React.Dispatch<React.SetStateAction<Person[]>>;
  selectedRows: string[];
  setSelectedRows: React.Dispatch<React.SetStateAction<string[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  deleteMultipleRows: () => void;
  getRowsOnPage: () => Person[];
  editRow: (rowId: string, modifiedData: Person) => void;
};
