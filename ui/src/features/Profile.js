import React from "react";
import { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiComment, BiLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardFooter, Col, Container, Jumbotron, Row } from "reactstrap";
import { getProfilePost } from "./posts/postsSlice";
import { getProfile } from "./user/userSlice";

const renderPosts = (posts) =>
  posts.map((post) => (
    <Card key={post.id} className="my-3">
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
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
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
  ));

export default function Profile(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const profile = useSelector((state) => state.user.profile);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getProfile(id));
    dispatch(getProfilePost(id));
  }, []);

  return (
    <main>
      <Jumbotron className="profile-jumbotron">
        <div className="box">
          <AiOutlineUser className="icon" />
        </div>
        <h1 className="mt-2">{profile.name}</h1>
      </Jumbotron>
      <Container fluid={true} className="posts my-md-4">
        <Row className="justify-content-center">
          <Col lg="6">
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
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
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
        </Row>
      </Container>
    </main>
  );
}
