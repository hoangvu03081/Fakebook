import React from "react";
import { useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Jumbotron, Row } from "reactstrap";
import {
  acceptRequest,
  getFriendList,
  getRequests,
  getSentRequests,
  makeRequest,
  unfriend,
} from "./friends/friendsSlice";
import { getProfilePost } from "./posts/postsSlice";
import { getProfile } from "./user/userSlice";
import Posts from "./posts/Posts";

const Button = ({ content, onClick, type }) => {
  return (
    <button className={`btn mx-2 ${type}`} onClick={onClick}>
      {content}
    </button>
  );
};

const AdaptiveButton = ({ friends, requests, sentRequests, profile, user }) => {
  const dispatch = useDispatch();
  const isFriend = friends.find((friend) => friend.id === profile.id);
  if (isFriend)
    return (
      <Button
        type="d"
        content="Unfriend"
        onClick={() => dispatch(unfriend(profile))}
      />
    );

  const isRequest = requests.find((friend) => friend.id === profile.id);
  if (isRequest)
    return (
      <div className="d-flex" style={{ width: 400 }}>
        <Button
          content="Accept"
          onClick={() => dispatch(acceptRequest(profile))}
          type="s"
        />
        <Button
          type="d"
          content="Decline"
          onClick={() => dispatch(unfriend(profile))}
        />
      </div>
    );

  const isSentRequest = sentRequests.find((friend) => friend.id === profile.id);
  if (isSentRequest)
    return (
      <Button
        type="d"
        content="Unsend"
        onClick={() => dispatch(unfriend(profile))}
      />
    );

  if (user.id === profile.id) return null;

  return (
    <Button
      type="s"
      content="Add friend"
      onClick={() => dispatch(makeRequest(profile))}
    />
  );
};

const Profile = function Profile(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const profile = useSelector((state) => state.user.profile);
  const user = useSelector((state) => state.user.data);
  const friends = useSelector((state) => state.friends.friends);
  const requests = useSelector((state) => state.friends.requests);
  const sentRequests = useSelector((state) => state.friends.sentRequests);
  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    if (profile.id) dispatch(getProfilePost(profile));
  }, [dispatch, profile]);

  useEffect(() => {
    dispatch(getProfile(id));
    if (!friends.length) dispatch(getFriendList());
    if (!sentRequests.length) dispatch(getSentRequests());
    if (!requests.length) dispatch(getRequests());
  }, [id]);

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
                alt={profile.name}
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
            <AdaptiveButton
              friends={friends}
              requests={requests}
              sentRequests={sentRequests}
              profile={profile}
              user={user}
            />
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
