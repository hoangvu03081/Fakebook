import React from "react";
import { Route } from "react-router-dom";

export default function Register({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => (
        <div className="container-fluid">
          <Component {...propsRoute} />
        </div>
      )}
    ></Route>
  );
}
