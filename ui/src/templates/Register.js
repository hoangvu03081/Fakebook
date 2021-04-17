import React from "react";
import { Route } from "react-router-dom";

export default function Register({ Component, bgColor, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => (
        <div className="container-fluid" style={{backgroundColor: bgColor}}>
          <Component {...propsRoute} />
        </div>
      )}
    ></Route>
  );
}
