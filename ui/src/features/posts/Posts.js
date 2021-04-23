import React, { useEffect, useMemo } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Friends from "../friends/Friends";
import AddPost from "./AddPost";
import { getPost } from "./postsSlice";
import { formatDistance } from "date-fns";
import { Card, CardFooter, Col, Container, Row } from "reactstrap";
import { BiComment, BiLike } from "react-icons/bi";
import SuggestedFriends from "../friends/SuggestedFriends";
import Post from "./Post";

export const renderPosts = (posts) => {
  return posts.map((post) => <Post post={post} key={post.id} />);
};

export default function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const token = useSelector((state) => state.user.token);
  const friends = useSelector((state) => state.friends.friends);

  useEffect(async () => {
    if (token) {
      const offset = new Date().getTimezoneOffset() * 60000;
      const ISOString = new Date(Date.now() - offset).toISOString();
      dispatch(getPost(ISOString));
    }
  }, []);

  return (
    <Container fluid={true} className="posts my-4">
      <Row className="justify-content-center">
        <Col md="6">
          <AddPost />

          <section className="posts">{renderPosts(posts)}</section>
        </Col>
        <Col
          md="4"
          className="d-none d-md-block"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <SuggestedFriends />
          <Friends />
        </Col>
      </Row>
    </Container>
  );
}
