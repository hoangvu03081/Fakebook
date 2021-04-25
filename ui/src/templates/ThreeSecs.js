import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { Col, Container, Input, Row } from "reactstrap";
import Header from "../components/Header/Header";
import Loading from "../components/Loading";
import { renderFriends } from "../features/friends/Friends";
import { friendSearch } from "../features/friends/friendsSlice";
import { isValidToken } from "../features/user/userSlice";

export default function ThreeSecs({ Component, ...props }) {
  const dispatch = useDispatch();
  const isValid = useSelector((state) => state.user.isValidToken);
  const searchResults = useSelector((state) => state.friends.search);

  // check for first time users go to page or check for valid token login
  // if don't valid then dispatch a function to check for valid again
  if (!isValid) {
    dispatch(isValidToken());
    return <Loading />;
  }

  return (
    <Route
      {...props}
      render={(propsRoute) => {
        return (
          <div className="wrapper">
            <Header />
            <Container fluid={true} className="pl-0 pr-0">
              <Row noGutters={true}>
                <Col
                  md="4"
                  className="suggests"
                  style={{ height: "calc(100vh - 73px)" }}
                >
                  <Component {...propsRoute} />
                </Col>
                <Col md="8">
                  <div className="search d-flex flex-column align-items-center p-4">
                    <Input
                      style={{
                        borderRadius: 50,
                        width: 300,
                        padding: 20,
                        fontSize: 20,
                        height: 50,
                      }}
                      type="text"
                      name="text"
                      placeholder="Search on Fakebook"
                      onKeyUp={(e) => {
                        dispatch(friendSearch(e.target.value));
                      }}
                    />
                    <br />
                    {renderFriends(searchResults)}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        );
      }}
    />
  );
}
