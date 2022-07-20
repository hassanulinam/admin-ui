const FailureView = () => {
  return (
    <div className="flex-center flex-col" style={{ height: "70vh" }}>
      <img
        alt="failure-img"
        className="failure-img"
        src="https://t4.ftcdn.net/jpg/04/66/09/49/360_F_466094947_SAuoRxJjwX80dLFr5PagHSiU2hroHfuQ.jpg"
      />
      <h2>Something went wrong</h2>
      <p>Sorry, We couldn't resolve your request</p>
      <p>Err: unable to access resources</p>
    </div>
  );
};

export default FailureView;
