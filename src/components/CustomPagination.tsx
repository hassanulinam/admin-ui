import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { DataState } from "../context/DataContextProvider";

type CustomProps = {
  activePgNo: number;
  setActivePgNo: React.Dispatch<React.SetStateAction<number>>;
  totalLength: number;
};

const CustomPagiation = ({
  activePgNo,
  setActivePgNo,
  totalLength,
}: CustomProps) => {
  let items: any = [];
  const [totalPages, setTotalPages] = useState(Math.ceil(totalLength / 10));
  const { setIsSelectedAll } = DataState();

  useEffect(() => {
    setTotalPages(Math.ceil(totalLength / 10));
  }, [totalLength]);

  useEffect(() => {
    setIsSelectedAll(false);
  }, [activePgNo]);

  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item key={i} active={i === activePgNo}>
        {i}
      </Pagination.Item>
    );
  }

  if (totalLength > 10)
    return (
      <div>
        <Pagination
          onClick={(e: any) => {
            e.preventDefault();
            setActivePgNo(parseInt(e.target.textContent));
          }}
        >
          {items}
        </Pagination>
      </div>
    );

  return null;
};

export default CustomPagiation;
