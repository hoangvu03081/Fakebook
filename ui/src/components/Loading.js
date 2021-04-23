import loading from "../assets/images/loading.gif";

export default function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100vh", overflow: "hidden" }}>
      <img src={loading} alt="" />
    </div>
  );
}
