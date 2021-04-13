import React from "react";

export default function Login() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="login-form">
        <div className="row g-0 align-items-center">
          <div className="col-6 d-none d-md-block position-relative">
            <div className="heading position-absolute">
              <h1 className="lead fw-bold" style={{ fontSize: 32 }}>
                Login to Fakebook
              </h1>
            </div>
            <img
              className="img-fluid boxShadow"
              src="./assets/images/login.jpg"
              alt="doll"
            />
          </div>
          <div className="col-12 col-md-6 boxShadow">
            <form>
              <div className="mb-4">
                <label>USERNAME</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label>PASSWORD</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div>
                <button type="submit" className="btn btn-success me-3">
                  Login
                </button>
                <span>or</span>
                <button className="btn text-secondary">Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
