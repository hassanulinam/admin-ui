import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AdminView from "./components/AdminView";
import FailureView from "./components/FailureView";
import LoadingView from "./components/LoadingView";
import { DataState } from "./context/DataContextProvider";
import "./App.css";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "LOADING",
  success: "SUCCESS",
  failure: "FAILED",
};

const App = () => {
  const { setData, setSearchResults } = DataState();
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);

  const fetchData = async () => {
    setApiStatus(apiConstants.inProgress);
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setData(data);
      setSearchResults([...data]);
      setApiStatus(apiConstants.success);
    } else setApiStatus(apiConstants.failure);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderViewBasedOnApiStatus = () => {
    switch (apiStatus) {
      case apiConstants.inProgress:
        return <LoadingView />;
      case apiConstants.success:
        return <AdminView />;
      default:
        return <FailureView />;
    }
  };

  return (
    <Container className="pt-2 pb-5">{renderViewBasedOnApiStatus()}</Container>
  );
};

export default App;
