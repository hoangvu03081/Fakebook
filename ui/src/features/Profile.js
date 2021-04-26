import React from "react";
import { useEffect } from "react";
import Icon, { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardFooter, Col, Container, Jumbotron, Row } from "reactstrap";
import {
  acceptRequest,
  getFriendList,
  getRequests,
  getSentRequests,
  makeRequest,
  unfriend,
} from "./friends/friendsSlice";
import { getProfilePost } from "./posts/postsSlice";
import { clearProfile, fetchAvatar, getProfile } from "./user/userSlice";
import Posts from "./posts/Posts";

const Button = ({ type, content, profile }) => {
  const dispatch = useDispatch();
  if (type) type = type.toLowerCase();
  let onClick = null;
  switch (type) {
    case "accept":
      onClick = () => dispatch(acceptRequest(profile));
    case "addfriend":
      if (!onClick) onClick = () => dispatch(makeRequest(profile));
      return (
        <button className="btn s mx-2" onClick={onClick}>
          {content}
        </button>
      );
    case "decline":
    case "unfriend":
    case "unsent":
      onClick = () => dispatch(unfriend(profile));
      return (
        <button className="btn d mx-2" onClick={onClick}>
          {content}
        </button>
      );
    default:
      return null;
  }
};
const Profile = function Profile(props) {
  const dispatch = useDispatch();
  const { id } = props.match.params;
  const profile = useSelector((state) => state.user.profile);
  const friends = useSelector((state) => state.friends.friends);
  const requests = useSelector((state) => state.friends.requests);
  const sentRequests = useSelector((state) => state.friends.sentRequests);
  const user = useSelector((state) => state.user.data);
  const token = useSelector((state) => state.user.token);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (token) {
      dispatch(getProfile(id));
      dispatch(getProfilePost(id));
      dispatch(getFriendList(token));
      dispatch(getSentRequests(token));
      dispatch(getRequests(token));
    }
  }, [id, token]);

  useEffect(() => {
    if (profile.avatar) {
      dispatch(fetchAvatar({ type: "profile", avatarId: profile.avatar }));
    }
  }, [id, profile.avatar]);

  useEffect(() => {
    return () => {
      dispatch(clearProfile());
    };
  }, []);

  const renderedBtn = () => {
    if (friends.fetched && requests.fetched && sentRequests.fetched) {
      if (user.id === profile.id) return <Button />;
      else if (friends.data.find((friend) => friend.id === profile.id))
        return <Button type="unfriend" content="Unfriend" profile={profile} />;
      else if (requests.data.find((friend) => friend.id === profile.id)) {
        return (
          <div className="d-flex" style={{ width: 400 }}>
            <Button type="accept" content="Accept Request" profile={profile} />
            <Button
              type="decline"
              content="Decline Request"
              profile={profile}
            />
          </div>
        );
      } else if (sentRequests.data.find((friend) => friend.id === profile.id))
        return (
          <Button type="unsent" content="Unsent Request" profile={profile} />
        );
      return <Button type="addFriend" content="Add Friend" profile={profile} />;
    }
    return null;
  };

  return (
    <main>
      <Jumbotron className="profile-jumbotron">
        <div className="jumbo-box">
          <div className="box">
            {/* image */}
            {profile.avatarSrc ? (
              <img
                src={profile.avatarSrc}
                style={{
                  height: 200,
                  width: 200,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <UserOutlined
                className="user-icon"
                className="icon"
                style={{ fontSize: 180 }}
              />
            )}
          </div>
          <h1 className="mt-2">{profile.name}</h1>
          <div>
            {/* render the correct button */}
            {renderedBtn()}
          </div>
        </div>
      </Jumbotron>
      <Container fluid={true} className="posts my-md-4">
        <Row className="justify-content-center">
          <Col lg="6">
            <Posts posts={posts} />
          </Col>
        </Row>
      </Container>
    </main>
  );
};
export default Profile;
