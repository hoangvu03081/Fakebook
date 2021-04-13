import React from "react";

export default function Register() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="register-form">
        <div className="row g-0 align-items-center">
          <div className="col-6 d-none d-md-block position-relative">
            <div className="heading position-absolute">
              <h1 className="lead fw-bold" style={{fontSize: 32}}>Register Fakebook</h1>
            </div>
            <img
              className="img-fluid boxShadow"
              src="./assets/images/register.jpg"
              alt="doll"
            />
          </div>
          <div className="col-12 col-md-6 boxShadow">
            <form>
              <div className="mb-4">
                <label>NAME</label>
                <input
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
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
              <button type="submit" className="btn btn-success">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
