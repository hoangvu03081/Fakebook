import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friends from "../friends/Friends";
import AddPost from "./AddPost";
import { Col, Container, Row } from "reactstrap";
import { getISOStringNow } from "../../configs/normalizeFunc";
import Posts from "./Posts";
import { Link } from "react-router-dom";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { getPost, logout } from "./postsSlice";

export default function MainFeed() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    const ISOString = getISOStringNow();
    dispatch(getPost(ISOString));
    return () => {
      dispatch(logout());
    };
  }, []);

  return (
    <Container fluid={true} className="posts my-4">
      <Row>
        <Col md="3">
          <section className="features p-4 bg-light rounded w-100 mb-3">
            <Link
              className="user d-flex align-items-center rounded cursor-pointer"
              to="/requests"
            >
              <UsergroupAddOutlined className="user-icon" />{" "}
              <span className="username">Friends</span>
            </Link>
          </section>
        </Col>
        <Col md="6">
          <AddPost />
          <Posts posts={posts} />
        </Col>
        <Col
          md="3"
          className="d-none d-md-block"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <Friends />
        </Col>
      </Row>
    </Container>
  );
}
