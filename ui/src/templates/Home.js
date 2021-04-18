import React from "react";
import { Route } from "react-router";
import Header from "../components/Header/Header";

export default function Home({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsRoute) => {
        // Nếu gửi action lên lấy profile = api không được => qua login
        return (
          <>
            <Header />
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
}
