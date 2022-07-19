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

  items.push(
    <Pagination.First onClick={() => setPage(1)} disabled={page === 1}>
      &#60;&#60;
    </Pagination.First>,
    <Pagination.Prev
      onClick={() => setPage(page - 1 || 1)}
      disabled={page === 1}
    >
      &#60;
    </Pagination.Prev>
  );

  for (let i = 1; i <= totalPages; i++) {
    items.push(
      <Pagination.Item key={i} active={i === page} onClick={() => setPage(i)}>
        {i}
      </Pagination.Item>
    );
  }
  items.push(
    <Pagination.Next
      onClick={() => setPage(page + 1)}
      disabled={page === totalPages}
    >
      &#62;
    </Pagination.Next>,
    <Pagination.Last
      onClick={() => setPage(totalPages)}
      disabled={page === totalPages}
    >
      &#62;&#62;
    </Pagination.Last>
  );

  if (searchResults.length > 10)
    return <Pagination style={{ margin: "0 auto" }}>{items}</Pagination>;
  return null;
};

export default CustomPagiation;
