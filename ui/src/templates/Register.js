import React from "react";
import { Route } from "react-router-dom";
import { Container } from "reactstrap";

export default function Register({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => (
        <Container className="register" fluid={true}>
          {/* <div className="color"></div> */}
          {/* <div className="color"></div>
          <div className="color"></div>
          <div className="color"></div> */}
          <div className="box">
            {/* <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div>
            <div className="square"></div> */}
            <Container fluid="sm">
              <Component {...propsRoute} />
            </Container>
          </div>
        </Container>
      )}
    ></Route>
  );
}
