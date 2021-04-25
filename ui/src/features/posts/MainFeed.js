import React, { useEffect, useMemo } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Friends from "../friends/Friends";
import AddPost from "./AddPost";
import { getPost } from "./postsSlice";
import { Col, Container, Row } from "reactstrap";
import SuggestedFriends from "../friends/SuggestedFriends";
import { getISOStringNow } from "../../configs/normalizeFunc";
import Posts from "./Posts";
import { Link } from "react-router-dom";

export default function MainFeed() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.token);

  return (
    <Container fluid={true} className="posts my-4">
      <Row>
        <Col md="3">
          <section className="features p-4 bg-light rounded w-100 mb-3">
            <Link
              className="user d-flex align-items-center rounded cursor-pointer"
              to="/requests"
            >
              <AiOutlineUsergroupAdd className="user-icon" />{" "}
              <span className="username">Friends</span>
            </Link>
          </section>
        </Col>
        <Col md="6">
          <AddPost />
          <Posts type="post" />
        </Col>
        <Col
          md="3"
          className="d-none d-md-block"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          {/* <SuggestedFriends /> */}
          <Friends />
        </Col>
      </Row>
    </Container>
  );
}
