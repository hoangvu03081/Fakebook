import React from "react";
import Friends from "../friends/Friends";
import AddPost from "./AddPost";

export default function Posts() {
  return (
    <div className="p-0 posts container-md my-md-4">
      <div className="row">
        <div className="col-8">
          <section className="py-3">
            <div className="card">
              <AddPost />
            </div>
          </section>

          <section className="py-3">
            <div className="card">
              <header className="p-2 d-flex align-items-center">
                <img
                  src="https://picsum.photos/100/100"
                  alt=""
                  className="user-icon user-icon-lg"
                />
                <div className="card-header-info">
                  <h5>John</h5>
                  <span className="text-secondary">5 miniutes ago</span>
                </div>
              </header>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <img
                src="https://picsum.photos/2000/800"
                className="card-img-top"
                alt="..."
              />
              <div className="footer p-2">😉💖🚀</div>
            </div>
          </section>
        </div>
        <div className="col-4">
          <div style={{ overflowY: "auto" }}>
            <Friends></Friends>
          </div>
        </div>
      </div>
    </div>
  );
}
