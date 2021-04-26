import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router";
import Header from "../components/Header/Header";
import Loading from "../components/Loading";
import { isValidToken } from "../features/user/userSlice";

export default function Home({ Component, ...props }) {
  const dispatch = useDispatch();
  const isValid = useSelector((state) => state.user.isValidToken);

  // check for first time users go to page or check for valid token login
  // if don't valid then dispatch a function to check for valid again
  useEffect(() => {
    dispatch(isValidToken());
  }, []);
  if (!isValid) {
    return <Loading />;
  }
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
