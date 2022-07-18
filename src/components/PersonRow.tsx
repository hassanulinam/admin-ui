import { useEffect, useState } from "react";
import { DataState } from "../context/DataContextProvider";
import { Person } from "../customTypes";

type CustomProps = {
  pdata: Person;
  onEdit: (newRowId: string) => void;
  onSelect: (rowId: string) => void;
  onUnSelect: (rowId: string) => void;
};

const PersonRow = ({ pdata, onEdit, onSelect, onUnSelect }: CustomProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const { deleteRow, isSelectedAll } = DataState();

  useEffect(() => {
    setIsChecked(isSelectedAll);
  }, [isSelectedAll]);

  useEffect(() => {
    isChecked ? onSelect(pdata.id) : onUnSelect(pdata.id);
  }, [isChecked]);

  return (
    <tr className={isChecked ? "person-row bg-red" : "person-row"}>
      <td>
        <input
          type="checkbox"
          className="row-checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
      </td>
      <td>{pdata.name}</td>
      <td>{pdata.email}</td>
      <td>{pdata.role}</td>
      <td>
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => onEdit(pdata.id)}
        ></i>
        <span className="m-2"></span>
        <i
          className="fa fa-trash color-red"
          onClick={() => deleteRow(pdata.id)}
        ></i>
      </td>
    </tr>
  );
};

export default PersonRow;
