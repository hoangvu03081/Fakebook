import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import Header from "../components/Header/Header";
import { isValidToken } from "../features/user/userSlice";

export default function Home({ Component, ...props }) {
  const dispatch = useDispatch();
  const isValid = useSelector(state => state.user.isValidToken);
  if (!isValid) dispatch(isValidToken());
  return (
    <Route
      {...props}
      render={(propsRoute) => {
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
