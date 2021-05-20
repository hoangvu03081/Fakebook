import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import { Col, Container, Row } from "reactstrap";
import Header from "../components/Header/Header";
import Loading from "../components/Loading";
import { token } from "../configs/constants";
import Search from "../features/friends/Search";
import { isValidToken } from "../features/user/userSlice";

export default function ThreeSecs({ Component, ...props }) {
  const dispatch = useDispatch();

  // check for first time users go to page or check for valid token login
  // if don't valid then dispatch a function to check for valid again
  useEffect(() => {
    dispatch(isValidToken());
  }, []);

  if (!localStorage.getItem(token)) {
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
                  <Search />
                </Col>
              </Row>
            </Container>
          </div>
        );
      }}
    />
  );
}
