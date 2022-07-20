import Spinner from "react-bootstrap/Spinner";

function LoadingView() {
  return (
    <div style={{ height: "70vh" }} className="flex-center">
      <Spinner animation="grow">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingView;
