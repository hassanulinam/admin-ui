import { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import { DataState } from "../context/DataContextProvider";

const CustomPagiation = () => {
  let items: any = [];
  const { setIsSelectedAll, page, setPage, searchResults } = DataState();
  const [totalPages, setTotalPages] = useState(
    Math.ceil(searchResults.length / 10)
  );

  useEffect(() => {
    setTotalPages(Math.ceil(searchResults.length / 10));
  }, [searchResults.length]);

  useEffect(() => {
    setIsSelectedAll(false);
  }, [page]);

  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }

  if (searchResults.length > 10)
    return (
      <div>
        <Pagination>{items}</Pagination>
      </div>
    );

  return null;
};

export default CustomPagiation;
