import React, { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Friends from "../friends/Friends";
import AddPost from "./AddPost";
import { getPost } from "./postsSlice";
import { formatDistance } from "date-fns";
import { Card, CardFooter, Col, Container, Row } from "reactstrap";
import { BiComment, BiLike } from "react-icons/bi";
import SuggestedFriends from "../friends/SuggestedFriends";

export default function Posts() {
  const dispatch = useDispatch();

  const { posts } = useSelector((state) => state.posts);
  const { token } = useSelector((state) => state.user);
  const { friends } = useSelector((state) => state.friends);

  useEffect(() => {
    if (token) dispatch(getPost(new Date().toISOString()));
  }, [friends]);

  return (
    <Container fluid={true} className="posts my-md-4">
      <Row className="justify-content-center">
        <Col lg="6">
          <AddPost />

          <section className="posts">
            <Card className="my-3">
              <div className="py-2 px-3">
                <div className="d-flex align-items-center">
                  <img
                    src="https://picsum.photos/100/100"
                    alt=""
                    className="user-icon user-icon-lg"
                  />
                  <div className="card-header-info">
                    <h5>John</h5>
                    <span className="text-secondary">5 miniutes ago</span>
                  </div>
                </div>
                <div className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </div>
              </div>
              <img
                src="https://picsum.photos/2000/800"
                className="card-img-top"
                alt="..."
              />
              <CardFooter className="py-2 px-3">
                <div className="d-flex">
                  <div className="reaction-box">
                    <BiLike className="mt-1 mr-1" />
                    <span>123</span>
                  </div>
                  <div className="comment-box">
                    <BiComment className="mt-1 mr-1" />
                    <span>123</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </section>
        </Col>
        <Col lg="4" style={{ maxHeight: "100vh", overflowY: "auto" }}>
          <SuggestedFriends />
          <Friends />
        </Col>
      </Row>
    </Container>
  );
}
