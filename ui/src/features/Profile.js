import React from "react";
import { useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiComment, BiLike } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardFooter, Col, Container, Jumbotron, Row } from "reactstrap";
import { getFriendList } from "./friends/friendsSlice";
import { getProfilePost } from "./posts/postsSlice";
import { fetchAvatar, getProfile } from "./user/userSlice";
import { formatDistance } from "date-fns";
import { renderPosts } from "./posts/Posts";

const isFriend = (profile, friends) => {
  return friends.find((friend) => friend.id === profile.id);
};

export default function Profile(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const profile = useSelector((state) => state.user.profile);
  const friends = useSelector((state) => state.friends.friends);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(getProfile(id));
    dispatch(getProfilePost(id));
    if (!friends.length) dispatch(getFriendList());
  }, []);

  useEffect(() => {
    if (profile.avatar) {
      dispatch(fetchAvatar({ type: "profile", avatarId: profile.avatar }));
    }
  }, [profile.avatar]);

  return (
    <main>
      <Jumbotron className="profile-jumbotron">
        <div className="jumbo-box">
          <div className="box">
            {/* image */}
            <AiOutlineUser className="icon" />
          </div>
          <h1 className="mt-2">{profile.name}</h1>
          <div>
            {isFriend(profile, friends) ? (
              <button className="btn btn-danger">Unfriend</button>
            ) : (
              <button className="btn btn-primary">Add Friend</button>
            )}
          </div>
        </div>
      </Jumbotron>
      <Container fluid={true} className="posts my-md-4">
        <Row className="justify-content-center">
          <Col lg="6">
            <section className="posts">{renderPosts(posts)}</section>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
