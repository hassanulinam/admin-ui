import { useEffect, useState } from "react";
import { DataState } from "../context/DataContextProvider";
import { Person } from "../customTypes";

type CustomProps = {
  pdata: Person;
  onSelect: (rowId: string) => void;
  onUnSelect: (rowId: string) => void;
};

const PersonRow = ({ pdata, onSelect, onUnSelect }: CustomProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(pdata.name);
  const [newMail, setNewMail] = useState(pdata.email);
  const [newRole, setNewRole] = useState(pdata.role);
  const { deleteRow, isSelectedAll, editRow } = DataState();

  useEffect(() => {
    setIsChecked(isSelectedAll);
  }, [isSelectedAll]);

  useEffect(() => {
    isChecked ? onSelect(pdata.id) : onUnSelect(pdata.id);
  }, [isChecked]);

  const onEdit = () => {
    const modifiedData = {
      id: pdata.id,
      name: newName,
      email: newMail,
      role: newRole,
    };
    editRow(pdata.id, modifiedData);
    setIsEditing(false);
  };

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
      {isEditing ? (
        <>
          <td>
            <input
              type="text"
              value={newName}
              onChange={(e: any) => setNewName(e.target.value)}
            />
          </td>
          <td>
            <input
              type="text"
              value={newMail}
              onChange={(e: any) => setNewMail(e.target.value)}
            />
          </td>
          <td>
            <select
              value={newRole}
              onChange={(e: any) => {
                setNewRole(e.target.value);
                console.log("on changing option....", e.target.value);
              }}
            >
              <option value="admin">admin</option>
              <option value="member">member</option>
            </select>
          </td>
        </>
      ) : (
        <>
          <td>{pdata.name}</td>
          <td>{pdata.email}</td>
          <td>{pdata.role}</td>
        </>
      )}
      <td>
        {isEditing ? (
          <i className="fa-solid fa-check" onClick={onEdit}></i>
        ) : (
          <i
            className="fa-solid fa-pen-to-square"
            onClick={() => setIsEditing(true)} // .......
          ></i>
        )}
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
